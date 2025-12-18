import './App.css'
import {Route, Routes, BrowserRouter,Navigate} from "react-router-dom";
import SignIn from "./identification/SignIn.jsx";
import LogIn from "./identification/LogIn.jsx";
import Payment from "./Virement/Transaction/Payment.jsx";
import Header from "./Header.jsx";
import ProtectedRoute from "./identification/TokenProtected.jsx";
import TransactionHistoric from "./Virement/Historique_Transaction/TransactionHistoric.jsx";
import TransactionHistoricDetails from "./Virement/Historique_Transaction/TransactionHistoricDetails.jsx";
import BeneficiaryPage from "./beneficiary/beneficiaryPage.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import BeneficiaryPayment from "./beneficiary/beneficiary_payment.jsx";
import AddBeneficiary from "./beneficiary/add_beneficiary/add_beneficiary.jsx";
import MoneyDeposit from "./Virement/Depot_argent/MoneyDeposit.jsx";
import AccountDetails from "./Dashboard/AccountDetails";









function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
                <Route path="/transaction_historic" element={<ProtectedRoute><TransactionHistoric/></ProtectedRoute>}/>
                <Route path="/transaction_historic_details/:id" element={<ProtectedRoute><TransactionHistoricDetails/></ProtectedRoute>}/>
                <Route path="/beneficiary" element={<ProtectedRoute><BeneficiaryPage/></ProtectedRoute>}/>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/account/detail/:id" element={<AccountDetails />} />
                <Route path="/beneficiary_Payment/:iban" element={<ProtectedRoute><BeneficiaryPayment/></ProtectedRoute>}/>
                <Route path="/add_beneficiary" element={<ProtectedRoute><AddBeneficiary/></ProtectedRoute>}/>
                <Route path="/money_deposit" element={<ProtectedRoute><MoneyDeposit/></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;