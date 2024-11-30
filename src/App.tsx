import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
