import { DiscountCodes } from "@/utils/constants";
import { OrderCart } from "@/utils/types";
import {
  Grid,
  Card,
  CardContent,
  Stack,
  CardActions,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

interface OrderSummaryProps {
  cart: OrderCart[];
  handleRemove: (id: string) => void;
}
const OrderSummary = ({ cart, handleRemove }: OrderSummaryProps) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const totalPrice = useMemo(() => {
    let total = 0;
    cart.forEach((c) => {
      total += Number(c.totalPrice);
    });
    return total;
  }, [cart]);
  const router = useRouter();

  const emptyCart = cart.length === 0;

  const applyDiscount = () => {
    const disc = DiscountCodes.find((d) => d.code === discountCode);
    if (disc) {
      const discount = totalPrice * disc.percent;
      setDiscount(Number(discount.toFixed(2)));
    }
  };

  useEffect(() => {
    setDiscount(0);
    setDiscountCode("");
  }, [cart]);
  return (
    <Card>
      <CardContent>
        <h2>Order Sumary</h2>
        <Stack>
          {cart.map((info) => (
            <>
              <Grid container spacing={2} mb="2">
                <Grid item xs={8}>
                  <b>{info.name}</b> - {info.size.toLowerCase()}
                  <Box>Quantity : {info.quantity}</Box>
                  {info.promoApplied && (
                    <Box color={"blue"}>
                      (promo applied - saves ${info.unitPrice})
                    </Box>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <b>${info.totalPrice}</b>
                </Grid>

                <Button
                  color="error"
                  size="small"
                  variant="text"
                  onClick={() => handleRemove(info.id)}
                  fullWidth={false}
                  sx={{ marginLeft: "10px" }}
                >
                  Remove
                </Button>
              </Grid>
              <hr />
            </>
          ))}
          {!emptyCart && (
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Discount Code"
                  onChange={(e) => setDiscountCode(e.target.value)}
                  value={discountCode}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={false}
                  onClick={applyDiscount}
                >
                  Apply Discount
                </Button>
              </Grid>
            </Grid>
          )}
        </Stack>
        <Divider />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={8}>
            <b>Sub Total</b>
          </Grid>
          <Grid item xs={4}>
            <b>${totalPrice.toFixed(2)}</b>
          </Grid>
          <Grid item xs={8}>
            Discount
          </Grid>
          <Grid item xs={4}>
            ${discount}
          </Grid>
          <Grid item xs={8}>
            <b>Order Total</b>
          </Grid>
          <Grid item xs={4}>
            <b>${(totalPrice - discount).toFixed(2)}</b>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ marginBottom: "20px" }}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={() => router.push("/ordersuccess")}
          disabled={emptyCart}
        >
          Checkout
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderSummary;
