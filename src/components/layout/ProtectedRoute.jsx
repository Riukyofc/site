import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles = ['admin'] }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/?login=true" />;
  }

  // Se o usuário não tiver permissão
  if (currentUser.role && !allowedRoles.includes(currentUser.role)) {
    // Retorna para a home e aciona a modal com erro. O estado de erro pode ser passado no state do location ou gerenciado no auth.
    // Como estamos redirecionando para a raiz, vamos usar state
    return <Navigate to="/?login=true" state={{ error: "Acesso Negado: Necessário privilégios de Diretoria." }} />;
  }

  return children;
};
