import './stylesheets/globals.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Form from './components/login/Form';
import GlobalProvider from './providers/GlobalProvider';
import AuthProvider from './hooks/auth-helpers';
import TodosProvider from './hooks/todos-helpers';
import Main from './components/main/Main';
import CreateTodoForm from './components/newtodo/CreateTodoForm';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <TodosProvider>
            <Layout>
                <Routes>
                  <Route path="/" element={<Form/>}/>
                  <Route path="/user" element={<ProtectedRoute component={<Main/>}/>}/>    
                  <Route path="/create" element={<ProtectedRoute component={<CreateTodoForm/>}/>}/>
                  <Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </Layout>
          </TodosProvider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
