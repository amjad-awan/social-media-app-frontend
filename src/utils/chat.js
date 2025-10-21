export const updateOnlineStatus = (chats, activeChat, userId, updateData) => {
  const updatedChats = chats.map((chat) => {
    const updatedMembers = chat.members.map((m) =>
      m._id === userId ? { ...m, ...updateData } : m
    );
    return { ...chat, members: updatedMembers };
  });

  let updatedActiveChat = activeChat;
  if (activeChat?.members?.some((m) => m._id === userId)) {
    updatedActiveChat = {
      ...activeChat,
      members: activeChat.members.map((m) =>
        m._id === userId ? { ...m, ...updateData } : m
      ),
    };
  }

  return { updatedChats, updatedActiveChat };
};
