import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './theme';

const variants = {
  primary: { bg: colors.primary, shadow: colors.primaryDark, fg: '#fff' },
  success: { bg: colors.green, shadow: colors.greenDark, fg: '#fff' },
  danger: { bg: colors.error, shadow: colors.errorDark, fg: '#fff' },
  ghost: { bg: colors.card, shadow: colors.border, fg: colors.primary, border: colors.border },
};

export function Button({ label, onPress, disabled, variant = 'primary', style }) {
  const v = variants[variant];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: v.bg, borderBottomColor: v.shadow },
        v.border && { borderWidth: 2, borderColor: v.border, borderBottomWidth: 4 },
        pressed && { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: v.fg }]}>{label}</Text>
    </Pressable>
  );
}

export function ProgressBar({ value, color = colors.green, height = 14, track = colors.locked }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={[styles.track, { height, backgroundColor: track }]}>
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

export function StatPill({ icon, value, color }) {
  return (
    <View style={styles.pill}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={[styles.pillText, { color }]}>{value}</Text>
    </View>
  );
}

export function BadgeTile({ badge }) {
  const on = badge.earned;
  return (
    <View style={[styles.badgeTile, !on && { opacity: 0.55 }]}>
      <View style={[styles.badgeCircle, { backgroundColor: on ? badge.color : colors.locked, borderBottomColor: on ? 'rgba(0,0,0,0.2)' : colors.lockedDark }]}>
        <Ionicons name={on ? badge.icon : 'lock-closed'} size={34} color="#fff" />
      </View>
      <Text style={styles.badgeTitle} numberOfLines={2}>{badge.title}</Text>
      <Text style={styles.badgeDesc} numberOfLines={2}>{on ? 'Conquistado!' : badge.description}</Text>
    </View>
  );
}

// Apoio visual: gráfico simples desenhado só com Views (sem dependências extras).
export function Graph({ fn, xMin = -3, xMax = 3, yMin = -5, yMax = 5, width = 260, height = 200 }) {
  const px = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const py = (y) => height - ((y - yMin) / (yMax - yMin)) * height;
  const xs = [];
  for (let x = Math.ceil(xMin); x <= xMax; x++) xs.push(x);
  const ys = [];
  for (let y = Math.ceil(yMin); y <= yMax; y++) ys.push(y);
  const dots = [];
  for (let x = xMin; x <= xMax; x += 0.03) {
    const y = fn(x);
    if (y >= yMin && y <= yMax) dots.push({ x: px(x), y: py(y) });
  }
  return (
    <View style={[styles.graph, { width, height }]} accessibilityLabel="Gráfico da função">
      {xs.map((x) => (
        <View key={'gx' + x} style={[styles.gridV, { left: px(x), height }, x === 0 && styles.axisV]} />
      ))}
      {ys.map((y) => (
        <View key={'gy' + y} style={[styles.gridH, { top: py(y), width }, y === 0 && styles.axisH]} />
      ))}
      {xs.filter((x) => x !== 0).map((x) => (
        <Text key={'lx' + x} style={[styles.tick, { left: px(x) - 8, top: Math.min(Math.max(py(0) + 2, 0), height - 14) }]}>{x}</Text>
      ))}
      {ys.filter((y) => y !== 0).map((y) => (
        <Text key={'ly' + y} style={[styles.tick, { left: px(0) + 3, top: py(y) - 7 }]}>{y}</Text>
      ))}
      {dots.map((d, i) => (
        <View key={i} style={[styles.dot, { left: d.x - 2.5, top: d.y - 2.5 }]} />
      ))}
    </View>
  );
}

export function BottomNav({ tab, onChange }) {
  const items = [
    { id: 'trilha', label: 'Trilha', icon: 'map' },
    { id: 'missoes', label: 'Missões', icon: 'flag' },
    { id: 'perfil', label: 'Perfil', icon: 'person' },
  ];
  return (
    <View style={styles.nav}>
      {items.map((it) => {
        const active = tab === it.id;
        return (
          <Pressable key={it.id} accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={() => onChange(it.id)} style={[styles.navItem, active && styles.navActive]}>
            <Ionicons name={active ? it.icon : `${it.icon}-outline`} size={26} color={active ? colors.accent : colors.muted} />
            <Text style={[styles.navText, active && { color: colors.accent }]}>{it.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center', borderBottomWidth: 4, marginVertical: 6 },
  buttonText: { fontSize: 16, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  disabled: { opacity: 0.4 },
  track: { borderRadius: 10, overflow: 'hidden', flex: 1 },
  fill: { height: '100%', borderRadius: 10 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4 },
  pillText: { fontWeight: '800', fontSize: 15 },
  badgeTile: { width: '48%', backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border, borderRadius: 20, padding: 16, alignItems: 'center', marginBottom: 12 },
  badgeCircle: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 5, marginBottom: 10 },
  badgeTitle: { fontWeight: '800', color: colors.text, textAlign: 'center', fontSize: 14 },
  badgeDesc: { color: colors.muted, textAlign: 'center', fontSize: 12, marginTop: 4 },
  graph: { alignSelf: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginVertical: 16 },
  gridV: { position: 'absolute', top: 0, width: 1, backgroundColor: '#EEF1F5' },
  gridH: { position: 'absolute', left: 0, height: 1, backgroundColor: '#EEF1F5' },
  axisV: { backgroundColor: '#8A94A6', width: 2 },
  axisH: { backgroundColor: '#8A94A6', height: 2 },
  tick: { position: 'absolute', fontSize: 10, color: colors.muted, width: 16, textAlign: 'center' },
  dot: { position: 'absolute', width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accent },
  nav: { flexDirection: 'row', borderTopWidth: 2, borderColor: colors.border, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.card },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 14, marginHorizontal: 6 },
  navActive: {},
  navText: { fontSize: 11, fontWeight: '800', color: colors.muted, marginTop: 2 },
});
