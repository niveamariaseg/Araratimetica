import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, mascots } from '../theme';
import { Button, ProgressBar, Graph } from '../components';
import { XP_FIRST_TRY, XP_RETRY, XP_LESSON_BONUS } from '../data';

// Tela 4 – Exercício: botão de saída, barra de progresso, enunciado, apoio visual e 4 alternativas.
export default function LessonScreen({ lesson, completesModule, nextModuleTitle, streakAfter, tickets, onHelp, onExit, onFinish }) {
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('answering'); // answering | correct | wrong
  const [wrongHere, setWrongHere] = useState(0);
  const [stats, setStats] = useState({ xp: 0, firstTry: 0, mistakes: 0 });
  const [finished, setFinished] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [draft, setDraft] = useState(''); // RNF04: o texto é preservado enquanto a tela estiver aberta
  const [toast, setToast] = useState('');
  const [confirmExit, setConfirmExit] = useState(false);

  const total = lesson.questions.length;
  const q = lesson.questions[qi];

  const check = () => {
    if (selected === q.answer) {
      const first = wrongHere === 0;
      setStats((st) => ({ ...st, xp: st.xp + (first ? XP_FIRST_TRY : XP_RETRY), firstTry: st.firstTry + (first ? 1 : 0) }));
      setStatus('correct');
    } else {
      setWrongHere((n) => n + 1);
      setStats((st) => ({ ...st, mistakes: st.mistakes + 1 }));
      setStatus('wrong');
    }
  };

  const retry = () => {
    setSelected(null);
    setStatus('answering');
  };

  const next = () => {
    setToast('');
    if (qi + 1 < total) {
      setQi(qi + 1);
      setSelected(null);
      setStatus('answering');
      setWrongHere(0);
    } else {
      setFinished(true);
    }
  };

  const sendHelp = () => {
    onHelp({ questionId: q.id, questionText: q.text, lessonTitle: lesson.title, moduleTitle: lesson.moduleTitle, text: draft.trim() });
    setDraft('');
    setHelpOpen(false);
    setToast('Pedido registrado • Aguardando atendimento');
  };

  if (finished) {
    const perfect = stats.mistakes === 0;
    const totalXp = stats.xp + XP_LESSON_BONUS;
    return (
      <View style={s.finish}>
        <Image source={completesModule ? mascots.formatura : perfect ? mascots.nota : mascots.coracao} style={s.finishMascot} />
        <Text style={s.finishTitle}>{completesModule ? 'Módulo concluído!' : 'Lição concluída!'}</Text>
        <Text style={s.finishBody}>
          {completesModule
            ? `Você ganhou o emblema de maestria "${completesModule}".${nextModuleTitle ? ` O módulo ${nextModuleTitle} foi desbloqueado.` : ''}`
            : perfect ? 'Sem nenhum erro. Mandou muito bem!' : 'Cada erro é uma pista. Continue assim!'}
        </Text>
        <View style={s.resultRow}>
          <Result icon="flash" color={colors.goldDark} label="XP ganho" value={`+${totalXp}`} />
          <Result icon="checkmark-circle" color={colors.green} label="De primeira" value={`${stats.firstTry}/${total}`} />
          <Result icon="flame" color={colors.accent} label="Ofensiva" value={`${streakAfter} ${streakAfter === 1 ? 'dia' : 'dias'}`} />
        </View>
        <Button label="Continuar" variant="success" onPress={() => onFinish({ xp: totalXp, firstTry: stats.firstTry, perfect })} style={{ alignSelf: 'stretch' }} />
      </View>
    );
  }

  const progress = (qi + (status === 'correct' ? 1 : 0)) / total;
  const myTickets = tickets.filter((t) => t.questionId === q.id);

  return (
    <View style={{ flex: 1 }}>
      <View style={s.top}>
        <Pressable onPress={() => setConfirmExit(true)} accessibilityLabel="Sair da lição" hitSlop={12}>
          <Ionicons name="close" size={30} color={colors.muted} />
        </Pressable>
        <ProgressBar value={progress} height={16} />
        <Pressable onPress={() => setHelpOpen(true)} accessibilityLabel="Pedir ajuda" hitSlop={12}>
          <Ionicons name="help-buoy" size={28} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.eyebrow}>{lesson.moduleTitle.toUpperCase()} • {lesson.title}</Text>
        <Text style={s.question}>{q.text}</Text>
        {q.graph && <Graph {...q.graph} />}
        <View style={{ marginTop: q.graph ? 0 : 20 }}>
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            const showCorrect = status === 'correct' && i === q.answer;
            const showWrong = status === 'wrong' && isSel;
            return (
              <Pressable
                key={i}
                disabled={status !== 'answering'}
                onPress={() => setSelected(i)}
                style={[s.option, isSel && s.optionSel, showCorrect && s.optionCorrect, showWrong && s.optionWrong]}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSel }}
              >
                <View style={[s.letter, isSel && { borderColor: colors.primary }]}>
                  <Text style={s.letterText}>{String.fromCharCode(65 + i)}</Text>
                </View>
                <Text style={s.optionText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
        {!!toast && (
          <View style={s.toast}>
            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={s.toastText}>{toast}</Text>
          </View>
        )}
      </ScrollView>

      <View style={[s.footer, status === 'correct' && { backgroundColor: colors.greenLight }, status === 'wrong' && { backgroundColor: colors.errorLight }]}>
        {status === 'correct' && (
          <View style={s.feedback}>
            <Image source={mascots.joinha} style={s.feedbackImg} />
            <View style={{ flex: 1 }}>
              <Text style={[s.feedbackTitle, { color: colors.greenDark }]}>Muito bem!</Text>
              <Text style={s.feedbackBody}>+{wrongHere === 0 ? XP_FIRST_TRY : XP_RETRY} XP</Text>
            </View>
          </View>
        )}
        {status === 'wrong' && (
          <View style={s.feedback}>
            <Image source={mascots.confuso} style={s.feedbackImg} />
            <View style={{ flex: 1 }}>
              <Text style={[s.feedbackTitle, { color: colors.errorDark }]}>Quase lá! Uma dica:</Text>
              <Text style={s.feedbackBody}>{q.hint}</Text>
            </View>
          </View>
        )}
        {status === 'answering' && <Button label="Verificar" onPress={check} disabled={selected === null} />}
        {status === 'correct' && <Button label="Continuar" variant="success" onPress={next} />}
        {status === 'wrong' && <Button label="Tentar de novo" variant="danger" onPress={retry} />}
      </View>

      {helpOpen && (
        <View style={s.overlay}>
          <Pressable style={{ flex: 1 }} onPress={() => setHelpOpen(false)} accessibilityLabel="Fechar ajuda" />
          <View style={s.sheet}>
            <Image source={mascots.pensando} style={s.sheetImg} />
            <View style={s.sheetHeader}>
              <Text style={s.sheetTitle}>Pedir ajuda à monitoria</Text>
              <Pressable onPress={() => setHelpOpen(false)} hitSlop={12}>
                <Ionicons name="close" size={26} color={colors.muted} />
              </Pressable>
            </View>
            <Text style={s.sheetBody}>Seu pedido fica vinculado a este exercício. Um monitor ou professor responde assim que possível.</Text>
            {myTickets.map((t) => (
              <View key={t.id} style={s.ticket}>
                <Text style={s.ticketText}>“{t.text}”</Text>
                <Text style={s.ticketStatus}>{t.status}</Text>
              </View>
            ))}
            <TextInput multiline value={draft} onChangeText={setDraft} placeholder="O que você não entendeu?" style={s.input} />
            <Button label="Enviar pedido" onPress={sendHelp} disabled={!draft.trim()} />
          </View>
        </View>
      )}

      {confirmExit && (
        <View style={s.overlay}>
          <Pressable style={{ flex: 1 }} onPress={() => setConfirmExit(false)} accessibilityLabel="Continuar na lição" />
          <View style={[s.sheet, { alignItems: 'center' }]}>
            <Image source={mascots.chorando} style={s.exitImg} />
            <Text style={[s.sheetTitle, { textAlign: 'center' }]}>Espere, não vá embora!</Text>
            <Text style={[s.sheetBody, { textAlign: 'center' }]}>Se sair agora, o progresso desta lição será perdido.</Text>
            <Button label="Continuar a lição" onPress={() => setConfirmExit(false)} style={{ alignSelf: 'stretch' }} />
            <Pressable onPress={onExit} hitSlop={8}>
              <Text style={s.exitLink}>Sair mesmo assim</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

function Result({ icon, color, label, value }) {
  return (
    <View style={[s.result, { borderColor: color }]}>
      <Text style={[s.resultLabel, { backgroundColor: color }]}>{label}</Text>
      <View style={s.resultValue}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={[s.resultText, { color }]}>{value}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14 },
  content: { padding: 20, paddingTop: 8, paddingBottom: 30 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 1, color: colors.muted },
  question: { fontSize: 22, fontWeight: '900', color: colors.text, marginTop: 8, lineHeight: 30 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, borderWidth: 2, borderBottomWidth: 4, borderColor: colors.border, backgroundColor: colors.card, marginBottom: 10 },
  optionSel: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  optionCorrect: { borderColor: colors.green, backgroundColor: colors.greenLight },
  optionWrong: { borderColor: colors.error, backgroundColor: colors.errorLight },
  letter: { width: 32, height: 32, borderRadius: 8, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  letterText: { fontWeight: '800', color: colors.muted },
  optionText: { fontSize: 17, fontWeight: '700', color: colors.text, flex: 1 },
  toast: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.greenLight, padding: 12, borderRadius: 12, marginTop: 6 },
  toastText: { color: colors.primary, fontWeight: '700', flex: 1 },
  footer: { padding: 16, borderTopWidth: 2, borderColor: colors.border },
  feedback: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  feedbackImg: { width: 64, height: 64, resizeMode: 'contain' },
  feedbackTitle: { fontSize: 18, fontWeight: '900' },
  feedbackBody: { color: colors.text, marginTop: 2, lineHeight: 20 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(22,35,58,0.45)' },
  sheetImg: { position: 'absolute', top: -70, right: 20, width: 90, height: 90, resizeMode: 'contain' },
  exitImg: { width: 140, height: 120, resizeMode: 'contain', marginBottom: 8 },
  exitLink: { color: colors.error, fontWeight: '800', padding: 14 },
  sheet: { backgroundColor: colors.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetTitle: { fontSize: 20, fontWeight: '900', color: colors.text },
  sheetBody: { color: colors.body, marginVertical: 10, lineHeight: 20 },
  ticket: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, marginBottom: 8 },
  ticketText: { color: colors.text },
  ticketStatus: { color: colors.accent, fontWeight: '800', fontSize: 12, marginTop: 4 },
  input: { borderWidth: 2, borderColor: colors.border, backgroundColor: colors.card, borderRadius: 14, padding: 14, minHeight: 90, textAlignVertical: 'top', fontSize: 15, marginBottom: 8 },
  finish: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  finishMascot: { width: 200, height: 200, resizeMode: 'contain' },
  finishTitle: { fontSize: 28, fontWeight: '900', color: colors.goldDark, marginTop: 16 },
  finishBody: { color: colors.body, textAlign: 'center', fontSize: 16, lineHeight: 23, marginVertical: 12 },
  resultRow: { flexDirection: 'row', gap: 10, marginVertical: 20, alignSelf: 'stretch' },
  result: { flex: 1, borderWidth: 2, borderRadius: 14, overflow: 'hidden' },
  resultLabel: { color: '#fff', fontWeight: '800', fontSize: 11, textAlign: 'center', paddingVertical: 4 },
  resultValue: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 12, backgroundColor: '#fff' },
  resultText: { fontWeight: '900', fontSize: 16 },
});
