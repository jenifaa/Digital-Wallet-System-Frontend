import AddMoney from "@/components/modules/User/AddMoney";
import CashIn from "@/components/modules/User/CashIn";
import CashOut from "@/components/modules/User/CashOut";
import Payment from "@/components/modules/User/Payment";
import SendMoney from "@/components/modules/User/SendMoney";
import UpdateProfile from "@/pages/user/UpdateProfile";

export const userPrivateRoutes = [
  {
    path: "send-money",
    Component: SendMoney,
  },
  {
    path: "add-money",
    Component: AddMoney,
  },
  {
    path: "cash-in",
    Component: CashIn,
  },
  {
    path: "cash-out",
    Component: CashOut,
  },
  {
    path: "payment",
    Component: Payment,
  },
  {
    Component: UpdateProfile,
    path: ":id",
  },
];
