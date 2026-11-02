import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, mascots } from '../theme';
import { BadgeTile } from '../components';
import { modules } from '../data';

// Tela 5 – Perfil: nome de usuário, avatar, estatísticas e vitrine de emblemas (RF03).
export default function ProfileScreen({ user, progress, badges, tickets, onLogout }) {
  const mastery = badges.filter((b) => b.mastery && b.earned).length;
  const showcase = [...badges].sort((a, b) => b.earned - a.earned).slice(0, 4);

  return (
    <View style={{ flex: 1 }}>
      <View style={s.top}>
        <Text style={s.username}>{user.name}</Text>
        <Pressable onPress={onLogout} accessibilityLabel="Sair da conta" hitSlop={12}>
          <Ionicons name="log-out-outline" size={26} color={colors.muted} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.avatarWrap}>
          <Image source={mascots.icone} style={s.avatar} />
        </View>
        <Text style={s.email}>{user.email} • TADS / UDESC</Text>

        <Text style={s.heading}>Estatísticas</Text>
        <View style={s.statsGrid}>
          <Stat icon="flame" color={colors.accent} value={progress.streak} label="Dias de ofensiva" />
          <Stat icon="flash" color={colors.goldDark} value={progress.xp} label="XP total" />
          <Stat icon="ribbon" color={colors.green} value={badges.filter((b) => b.earned).length} label="Emblemas" />
          <Stat icon="school" color={colors.primary} value={`${mastery}/${modules.length}`} label="Participação" />
        </View>

        <Text style={s.heading}>Meus emblemas</Text>
        <View style={s.grid}>
          {showcase.map((b) => (
            <BadgeTile key={b.id} badge={b} />
          ))}
        </View>

        <Text style={s.heading}>Meus pedidos de ajuda</Text>
        {tickets.length === 0 && (
          <View style={s.empty}>
            <Image source={mascots.pensando} style={s.emptyImg} />
            <Text style={[s.muted, { flex: 1 }]}>Quando surgir uma dúvida, toque na boia dentro do exercício para pedir ajuda.</Text>
          </View>
        )}
        {tickets.map((t) => (
          <View key={t.id} style={s.ticket}>
            <Text style={s.ticketText}>“{t.text}”</Text>
            <Text style={s.muted}>{t.moduleTitle} • {t.lessonTitle}: {t.questionText}</Text>
            <Text style={s.ticketStatus}>{t.status}</Text>
          </View>
        ))}

        <Text style={[s.muted, { marginTop: 20 }]}>
          Esboço local: o progresso fica só na memória e é reiniciado ao fechar o app. Login real, nota de participação e painel docente entram nas próximas etapas.
        </Text>
      </ScrollView>
    </View>
  );
}

function Stat({ icon, color, value, label }) {
  return (
    <View style={s.stat}>
      <Ionicons name={icon} size={24} color={color} />
      <View>
        <Text style={s.statValue}>{value}</Text>
        <Text style={s.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 2, borderColor: colors.border, backgroundColor: colors.card },
  username: { fontSize: 20, fontWeight: '900', color: colors.text },
  content: { padding: 16, paddingBottom: 40 },
  avatarWrap: { alignSelf: 'center', width: 140, height: 140, borderRadius: 70, overflow: 'hidden', borderWidth: 4, borderColor: colors.accent },
  avatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  email: { textAlign: 'center', color: colors.muted, marginTop: 10 },
  heading: { fontSize: 19, fontWeight: '900', color: colors.text, marginTop: 22, marginBottom: 10 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  stat: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 2, borderColor: colors.border, borderRadius: 16, padding: 12, marginBottom: 10, backgroundColor: colors.card },
  statValue: { fontSize: 18, fontWeight: '900', color: colors.text },
  statLabel: { fontSize: 12, color: colors.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  empty: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  emptyImg: { width: 80, height: 80, resizeMode: 'contain' },
  ticket: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border, borderRadius: 14, padding: 14, marginBottom: 10 },
  ticketText: { fontWeight: '700', color: colors.text, marginBottom: 4 },
  ticketStatus: { color: colors.accent, fontWeight: '800', fontSize: 12, marginTop: 6 },
  muted: { color: colors.muted, fontSize: 13, lineHeight: 19 },
});
