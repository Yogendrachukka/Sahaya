/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import DashboardPage from "./components/DashboardPage";
import TasksPage from "./components/TasksPage";
import ProjectsPage from "./components/ProjectsPage";
import SchedulePage from "./components/SchedulePage";
import PlaceholderPage from "./components/PlaceholderPage";
import { Settings } from "lucide-react";

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [chatKey, setChatKey] = useState(0);
  const [isNewChat, setIsNewChat] = useState(false);

  const handleNewChat = () => {
    setChatKey((prev) => prev + 1);
    setIsNewChat(true);
    if (activeNav !== 'Home' && activeNav !== 'Chats') {
      setActiveNav('Chats');
    }
  };

  const renderContent = () => {
    switch (activeNav) {
      case "Home":
        return <DashboardPage />;
      case "Chats":
        return (
          <div className="h-full flex flex-col w-full max-w-5xl mx-auto">
            <ChatPanel key={`chat-only-${chatKey}`} startEmpty={isNewChat} />
          </div>
        );
      case "Projects":
        return <ProjectsPage />;
      case "Tasks":
        return <TasksPage />;
      case "Schedule":
        return <SchedulePage />;
      case "Settings":
        return <PlaceholderPage title="Settings" icon={<Settings className="w-10 h-10" />} goHome={() => setActiveNav("Home")} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-app-bg text-app-ink font-sans text-[13.5px] antialiased">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} onNewChat={handleNewChat} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
