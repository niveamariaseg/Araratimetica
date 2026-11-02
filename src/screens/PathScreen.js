import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, mascots } from '../theme';
import { StatPill } from '../components';
import { modules, lessonList, isModuleDone, previousLesson } from '../data';

// Tela 1 – Mapa / trilha de aprendizado (caminho sinuoso + indicadores no topo).
// Cada módulo curva para um lado; o mascote do módulo fica no lado oposto.
const OFFSETS = [-10, -70, -95, -60];

export default function PathScreen({ progress, badgesEarned, onOpenLesson }) {
  const [notice, setNotice] = useState('');
  const currentId = lessonList.find((l) => !progress.completed[l.id])?.id;

  return (
    <View style={{ flex: 1 }}>
      <View style={s.topBar}>
        <Text style={s.brand}>∑ <Text style={{ color: colors.accent }}>missões</Text></Text>
        <View style={s.stats}>
          <StatPill icon="flame" color={colors.accent} value={progress.streak} />
          <StatPill icon="flash" color={colors.goldDark} value={progress.xp} />
          <StatPill icon="ribbon" color={colors.green} value={badgesEarned} />
        </View>
      </View>

      {!!notice && (
        <Pressable onPress={() => setNotice('')} style={s.notice}>
          <Ionicons name="lock-closed" size={16} color={colors.body} />
          <Text style={s.noticeText}>{notice}</Text>
          <Ionicons name="close" size={16} color={colors.body} />
        </Pressable>
      )}

      <ScrollView contentContainerStyle={s.content}>
        {modules.map((m, mi) => {
          const firstLocked = !(mi === 0 || isModuleDone(modules[mi - 1], progress.completed));
          const done = isModuleDone(m, progress.completed);
          const dir = mi % 2 === 0 ? 1 : -1;
          let nodeIndex = 0;
          return (
            <View key={m.id} style={{ marginBottom: 12 }}>
              <View style={[s.unit, { backgroundColor: firstLocked ? colors.lockedDark : m.color }]}>
                <Text style={s.unitEyebrow}>MÓDULO {mi + 1}</Text>
                <Text style={s.unitTitle}>{m.title}</Text>
                <Text style={s.unitDesc}>{m.description}</Text>
              </View>

              <View style={s.path}>
                <Image source={mascots[m.mascot]} style={[s.mascot, dir === 1 ? { right: 0 } : { left: 0 }, firstLocked && { opacity: 0.45 }]} />
                {m.lessons.map((l) => {
                  const offset = OFFSETS[nodeIndex++ % OFFSETS.length] * dir;
                  const state = progress.completed[l.id] ? 'done' : l.id === currentId ? 'current' : 'locked';
                  const onPress = () => {
                    if (state === 'locked') {
                      setNotice(`Conclua "${previousLesson(l.id)?.title}" para desbloquear esta lição.`);
                    } else {
                      setNotice('');
                      onOpenLesson(l.id);
                    }
                  };
                  return <PathNode key={l.id} offset={offset} state={state} color={m.color} label={l.title} onPress={onPress} />;
                })}
                <PathNode
                  offset={OFFSETS[nodeIndex++ % OFFSETS.length] * dir}
                  state={done ? 'trophy' : 'trophy-locked'}
                  color={colors.gold}
                  label={m.badge.title}
                  onPress={() => setNotice(done ? `Emblema "${m.badge.title}" conquistado!` : `Conclua o módulo ${m.title} para ganhar o emblema "${m.badge.title}".`)}
                />
              </View>
            </View>
          );
        })}
        <Text style={s.footer}>Mais módulos em breve: limites, derivadas e integrais.</Text>
      </ScrollView>
    </View>
  );
}

function PathNode({ offset, state, color, label, onPress }) {
  const locked = state === 'locked' || state === 'trophy-locked';
  const bg = locked ? colors.locked : state === 'trophy' ? colors.gold : color;
  const icon = { done: 'checkmark', current: 'star', locked: 'lock-closed', trophy: 'trophy', 'trophy-locked': 'trophy' }[state];
  return (
    <View style={[s.nodeWrap, { transform: [{ translateX: offset }] }]}>
      {state === 'current' && (
        <View style={s.bubble}>
          <Text style={[s.bubbleText, { color }]}>COMEÇAR</Text>
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label} – ${locked ? 'bloqueado' : state === 'done' ? 'concluído' : 'disponível'}`}
        onPress={onPress}
        style={({ pressed }) => [
          s.node,
          { backgroundColor: bg, borderBottomColor: locked ? colors.lockedDark : 'rgba(0,0,0,0.22)' },
          state === 'current' && s.nodeCurrent,
          pressed && { transform: [{ translateY: 3 }], borderBottomWidth: 3 },
        ]}
      >
        <Ionicons name={icon} size={32} color={locked ? colors.lockedIcon : '#fff'} />
      </Pressable>
      <Text style={[s.nodeLabel, locked && { color: colors.muted }]} numberOfLines={1}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 2, borderColor: colors.border, backgroundColor: colors.card },
  brand: { fontSize: 18, fontWeight: '900', color: colors.text },
  stats: { flexDirection: 'row' },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surface, padding: 12, marginHorizontal: 16, marginTop: 10, borderRadius: 12 },
  noticeText: { flex: 1, color: colors.text, fontWeight: '600' },
  content: { padding: 16, paddingBottom: 40 },
  unit: { borderRadius: 18, padding: 18, borderBottomWidth: 4, borderBottomColor: 'rgba(0,0,0,0.18)' },
  unitEyebrow: { color: 'rgba(255,255,255,0.85)', fontWeight: '800', fontSize: 12, letterSpacing: 1.5 },
  unitTitle: { color: '#fff', fontWeight: '900', fontSize: 22, marginTop: 2 },
  unitDesc: { color: 'rgba(255,255,255,0.92)', marginTop: 4 },
  path: { alignItems: 'center', paddingVertical: 18, minHeight: 200 },
  mascot: { position: 'absolute', top: 30, width: 130, height: 130, resizeMode: 'contain' },
  nodeWrap: { alignItems: 'center', marginVertical: 8, width: 130 },
  node: { width: 72, height: 68, borderRadius: 36, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 6 },
  nodeCurrent: { width: 82, height: 76, borderRadius: 41 },
  nodeLabel: { marginTop: 6, fontSize: 12, fontWeight: '700', color: colors.text, textAlign: 'center' },
  bubble: { backgroundColor: '#fff', borderWidth: 2, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 6 },
  bubbleText: { fontWeight: '900', fontSize: 12, letterSpacing: 1 },
  footer: { textAlign: 'center', color: colors.muted, marginTop: 8 },
});
