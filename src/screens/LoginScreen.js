import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { colors, mascots } from '../theme';
import { Button } from '../components';

// RF01/RN01 – cadastro restrito ao e-mail institucional; RF02 – confirmação (simulada).
const EMAIL_RE = /^[^\s@]+@edu\.udesc\.br$/i;

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = () => {
    if (!name.trim()) return setError('Informe seu nome.');
    if (!EMAIL_RE.test(email.trim())) return setError('Use seu e-mail institucional (@edu.udesc.br).');
    if (password.length < 6) return setError('A senha precisa ter pelo menos 6 caracteres.');
    setError('');
    setPending(true);
  };

  if (pending) {
    return (
      <View style={s.center}>
        <Image source={mascots.lendo} style={s.mascot} />
        <Text style={s.title}>Confirme seu e-mail</Text>
        <Text style={s.body}>
          Enviamos um link de confirmação para <Text style={s.bold}>{email.trim()}</Text>. Sua conta fica pendente até a confirmação.
        </Text>
        <Text style={s.note}>Esboço: nenhum e-mail é enviado de verdade.</Text>
        <Button label="Já confirmei, entrar" onPress={() => onLogin({ name: name.trim(), email: email.trim() })} style={s.full} />
        <Pressable onPress={() => setPending(false)}>
          <Text style={s.link}>Corrigir meus dados</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
      <Image source={mascots.joinha} style={s.mascot} />
      <Text style={s.brand}>∑ Cálculo em Missões</Text>
      <Text style={s.body}>Pequenas missões, grandes descobertas. Sua base para Introdução ao Cálculo.</Text>

      <Text style={s.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Como você quer ser chamado?" style={s.input} />
      <Text style={s.label}>E-mail institucional</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="voce@edu.udesc.br" autoCapitalize="none" keyboardType="email-address" style={s.input} />
      <Text style={s.label}>Senha</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder="Mínimo de 6 caracteres" secureTextEntry style={s.input} />

      {!!error && <Text style={s.error} accessibilityLiveRegion="polite">{error}</Text>}
      <Button label="Criar conta" onPress={submit} style={{ marginTop: 16 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 24, paddingTop: 32 },
  center: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  mascot: { width: 150, height: 150, resizeMode: 'contain', alignSelf: 'center' },
  brand: { fontSize: 26, fontWeight: '900', color: colors.accent, textAlign: 'center', marginTop: 12 },
  title: { fontSize: 24, fontWeight: '900', color: colors.text, marginTop: 16, textAlign: 'center' },
  body: { fontSize: 15, color: colors.body, textAlign: 'center', lineHeight: 22, marginVertical: 10 },
  bold: { fontWeight: '800', color: colors.text },
  note: { fontSize: 12, color: colors.muted, marginBottom: 16 },
  label: { fontWeight: '800', color: colors.text, marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 2, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 14, padding: 14, fontSize: 16, color: colors.text },
  error: { color: colors.error, fontWeight: '700', marginTop: 12 },
  full: { alignSelf: 'stretch' },
  link: { color: colors.primary, fontWeight: '800', padding: 14 },
});
