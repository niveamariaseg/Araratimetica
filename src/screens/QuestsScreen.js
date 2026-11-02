import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, mascots } from '../theme';
import { ProgressBar, BadgeTile } from '../components';
import { getDailyQuests, lessonList, isUnlocked } from '../data';

// Tela 2 (Missões) e Tela 3 (Emblemas), alternadas pelas abas no topo, como no wireframe.
export default function QuestsScreen({ user, progress, badges, onOpenLesson }) {
  const [tab, setTab] = useState('missoes');

  return (
    <View style={{ flex: 1 }}>
      <View style={s.tabs}>
        {[['missoes', 'Missões'], ['emblemas', 'Emblemas']].map(([id, label]) => (
          <Pressable key={id} onPress={() => setTab(id)} style={[s.tab, tab === id && s.tabActive]} accessibilityRole="tab" accessibilityState={{ selected: tab === id }}>
            <Text style={[s.tabText, tab === id && s.tabTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={s.content}>
        {tab === 'missoes' ? <Quests user={user} progress={progress} onOpenLesson={onOpenLesson} /> : <Badges badges={badges} />}
      </ScrollView>
    </View>
  );
}

function Quests({ user, progress, onOpenLesson }) {
  const daily = getDailyQuests(progress);
  const upcoming = lessonList.filter((l) => !progress.completed[l.id]).slice(0, 3);

  return (
    <>
      <View style={s.welcomeRow}>
        <View style={s.welcome}>
          <Text style={s.welcomeTitle}>Olá, {user.name.split(' ')[0]}!</Text>
          <Text style={s.welcomeBody}>
            {progress.lessonsToday > 0 ? 'Você já praticou hoje. Que tal mais uma missão?' : 'Cinco minutinhos hoje já fazem diferença.'}
          </Text>
        </View>
        <Image source={progress.lessonsToday > 0 ? mascots.coracao : mascots.joinha} style={s.mascot} />
      </View>

      <Text style={s.heading}>Missões diárias</Text>
      <View style={s.card}>
        {daily.map((q, i) => {
          const done = q.value >= q.goal;
          return (
            <View key={q.id} style={[s.quest, i > 0 && s.questDivider]}>
              <View style={[s.questIcon, done && { backgroundColor: colors.gold }]}>
                <Ionicons name={done ? 'checkmark' : q.icon} size={22} color={done ? '#fff' : colors.goldDark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.questTitle}>{q.title}</Text>
                <View style={s.questBar}>
                  <ProgressBar value={q.value / q.goal} color={colors.gold} />
                  <Text style={s.questCount}>{Math.min(q.value, q.goal)}/{q.goal}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <Text style={s.heading}>Próximas missões</Text>
      {upcoming.length === 0 && (
        <View style={s.empty}>
          <Image source={mascots.formatura} style={s.emptyImg} />
          <Text style={s.muted}>Você concluiu toda a trilha disponível. Parabéns!</Text>
        </View>
      )}
      {upcoming.map((l) => {
        const open = isUnlocked(l.id, progress.completed);
        return (
          <Pressable key={l.id} disabled={!open} onPress={() => onOpenLesson(l.id)} style={[s.card, s.upcoming, !open && { opacity: 0.55 }]}>
            <View style={[s.upIcon, { backgroundColor: open ? l.color : colors.locked }]}>
              <Ionicons name={open ? 'play' : 'lock-closed'} size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.questTitle}>{l.title}</Text>
              <Text style={s.muted}>{l.moduleTitle} • {l.questions.length} questões • ~5 min</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </Pressable>
        );
      })}
    </>
  );
}

function Badges({ badges }) {
  const earned = badges.filter((b) => b.earned).length;
  return (
    <>
      <View style={s.badgeHeader}>
        <Image source={mascots.formatura} style={s.badgeImg} />
        <View style={{ flex: 1 }}>
          <Text style={[s.heading, { marginTop: 0 }]}>Sua coleção</Text>
          <Text style={s.muted}>{earned} de {badges.length} emblemas conquistados. Emblemas de maestria contam para a nota de participação.</Text>
        </View>
      </View>
      <View style={s.grid}>
        {badges.map((b) => (
          <BadgeTile key={b.id} badge={b} />
        ))}
      </View>
    </>
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', borderBottomWidth: 2, borderColor: colors.border, backgroundColor: colors.card },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 14, borderBottomWidth: 3, borderColor: 'transparent', marginBottom: -2 },
  tabActive: { borderColor: colors.primary },
  tabText: { fontSize: 16, fontWeight: '800', color: colors.muted },
  tabTextActive: { color: colors.primary },
  content: { padding: 16, paddingBottom: 40 },
  welcomeRow: { flexDirection: 'row', gap: 12 },
  welcome: { flex: 1, backgroundColor: colors.primary, borderRadius: 18, padding: 16, justifyContent: 'center', borderBottomWidth: 4, borderBottomColor: colors.primaryDark },
  welcomeTitle: { fontSize: 20, fontWeight: '900', color: '#fff' },
  welcomeBody: { color: 'rgba(255,255,255,0.92)', marginTop: 6, lineHeight: 20 },
  mascot: { width: 120, height: 120, resizeMode: 'contain' },
  heading: { fontSize: 19, fontWeight: '900', color: colors.text, marginTop: 22, marginBottom: 10 },
  card: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border, borderRadius: 18, padding: 14, marginBottom: 10 },
  quest: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  questDivider: { borderTopWidth: 1, borderColor: colors.border },
  questIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.goldLight, alignItems: 'center', justifyContent: 'center' },
  questTitle: { fontWeight: '800', color: colors.text, fontSize: 15 },
  questBar: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  questCount: { color: colors.muted, fontWeight: '700', fontSize: 12, width: 40, textAlign: 'right' },
  upcoming: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  upIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  muted: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  empty: { alignItems: 'center', gap: 8 },
  emptyImg: { width: 140, height: 140, resizeMode: 'contain' },
  badgeHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  badgeImg: { width: 90, height: 90, resizeMode: 'contain' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
