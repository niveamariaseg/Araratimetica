import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import { BottomNav } from './src/components';
import { modules, lessonList, getBadges, isUnlocked } from './src/data';
import LoginScreen from './src/screens/LoginScreen';
import PathScreen from './src/screens/PathScreen';
import QuestsScreen from './src/screens/QuestsScreen';
import LessonScreen from './src/screens/LessonScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const initialProgress = {
  completed: {},
  xp: 0,
  xpToday: 0,
  lessonsToday: 0,
  firstTryToday: 0,
  perfectCount: 0,
  streak: 0,
  practicedToday: false,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('trilha');
  const [lessonId, setLessonId] = useState(null);
  const [progress, setProgress] = useState(initialProgress);
  const [tickets, setTickets] = useState([]);

  const badges = useMemo(() => getBadges(progress, tickets), [progress, tickets]);
  const lesson = lessonList.find((l) => l.id === lessonId);

  const openLesson = (id) => {
    if (isUnlocked(id, progress.completed)) setLessonId(id);
  };

  // Se esta lição for a última pendente do módulo, a conclusão concede o emblema e libera o próximo.
  let completesModule = null;
  let nextModuleTitle = null;
  if (lesson && !progress.completed[lesson.id]) {
    const m = modules[lesson.moduleIndex];
    if (m.lessons.every((l) => l.id === lesson.id || progress.completed[l.id])) {
      completesModule = m.badge.title;
      nextModuleTitle = modules[lesson.moduleIndex + 1]?.title ?? null;
    }
  }

  const finishLesson = (result) => {
    setProgress((p) => ({
      ...p,
      completed: { ...p.completed, [lessonId]: true },
      xp: p.xp + result.xp,
      xpToday: p.xpToday + result.xp,
      lessonsToday: p.lessonsToday + 1,
      firstTryToday: p.firstTryToday + result.firstTry,
      perfectCount: p.perfectCount + (result.perfect ? 1 : 0),
      streak: p.practicedToday ? p.streak : p.streak + 1,
      practicedToday: true,
    }));
    setLessonId(null);
    setTab('trilha');
  };

  const addTicket = (t) => setTickets((ts) => [{ ...t, id: String(Date.now()), status: 'Aguardando atendimento' }, ...ts]);

  const logout = () => {
    setUser(null);
    setProgress(initialProgress);
    setTickets([]);
    setTab('trilha');
  };

  let content;
  if (!user) {
    content = <LoginScreen onLogin={setUser} />;
  } else if (lesson) {
    content = (
      <LessonScreen
        key={lesson.id}
        lesson={lesson}
        completesModule={completesModule}
        nextModuleTitle={nextModuleTitle}
        streakAfter={progress.practicedToday ? progress.streak : progress.streak + 1}
        tickets={tickets}
        onHelp={addTicket}
        onExit={() => setLessonId(null)}
        onFinish={finishLesson}
      />
    );
  } else {
    content = (
      <>
        <View style={{ flex: 1 }}>
          {tab === 'trilha' && <PathScreen progress={progress} badgesEarned={badges.filter((b) => b.earned).length} onOpenLesson={openLesson} />}
          {tab === 'missoes' && <QuestsScreen user={user} progress={progress} badges={badges} onOpenLesson={openLesson} />}
          {tab === 'perfil' && <ProfileScreen user={user} progress={progress} badges={badges} tickets={tickets} onLogout={logout} />}
        </View>
        <BottomNav tab={tab} onChange={setTab} />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.shell}>{content}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  shell: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', backgroundColor: colors.bg },
});
