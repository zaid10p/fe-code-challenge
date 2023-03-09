import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import * as React from "react";
import { BURGER_LIST, Sizes } from "@/utils/constants";
import OrderModal from "./orderModal";
import { getPrice } from "@/utils/helper";
import { BurgerList, OrderCart } from "@/utils/types";
import OrderSummary from "./orderSummary";

const OrderPage = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedBurger, setSelectedBurger] = React.useState<BurgerList>();
  const [cart, setCart] = React.useState<OrderCart[]>([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddtoCart = (cartInfo: OrderCart) => {
    setCart((cart) => [...cart, cartInfo]);
    handleClose();
  };
  const handleRemove = (id: string) => {
    const updCart = cart.filter((c) => c.id !== id);
    setCart(updCart);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <h2>Burgers</h2>
        <Stack direction="row" spacing={2}>
          {BURGER_LIST.map((burger) => (
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
                <b>{burger.name}</b>
                <p>${getPrice(burger.price, Sizes.SMALL)}</p>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    setSelectedBurger(burger);
                    setOpen(true);
                  }}
                  variant="outlined"
                >
                  ADD
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>

        <OrderModal
          key={selectedBurger?.name}
          {...selectedBurger}
          open={open}
          onClose={handleClose}
          handleAddtoCart={handleAddtoCart}
          promoDisable={!!cart.find((c) => c.promoApplied)}
        />
      </Grid>
      <Grid item xs={3}>
        <OrderSummary cart={cart} handleRemove={handleRemove} />
      </Grid>
    </Grid>
  );
};

export default OrderPage;
