import { Box } from "@mui/material";
import Link from "next/link";

const OrderSuccess = () => {
  return (
    <Box>
      <h2>Thankyou for placing order!</h2>
      <h4>You will receive your order soon</h4>
      <Link href={"/"}>Home</Link>
    </Box>
  );
};

export default OrderSuccess;
