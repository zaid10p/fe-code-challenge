import { Sizes } from "@/utils/constants";
import { getPrice, randomId } from "@/utils/helper";
import { OrderCart } from "@/utils/types";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as React from "react";

interface OrderModalProps extends DialogProps {
  name?: string;
  price?: number;
  handleAddtoCart: (info: OrderCart) => void;
  promoDisable: boolean;
}
const PromoCode = "extra";

const OrderModal = (props: OrderModalProps) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [promo, setPromo] = React.useState<string>("");
  const isPromoValid = promo === PromoCode;

  const { name = "", price, handleAddtoCart, promoDisable, ...rest } = props;

  const handleSizeChange = (e: any) => {
    setSelectedSize(e.target.value);
  };

  const addtoCart = () => {
    const newQty = isPromoValid ? quantity + 1 : quantity;
    handleAddtoCart({
      id: randomId(),
      name,
      quantity: newQty,
      unitPrice: getPrice(price, selectedSize),
      totalPrice: (
        parseFloat(getPrice(price, selectedSize)) * quantity
      ).toFixed(2),
      size: selectedSize,
      promoApplied: isPromoValid,
    });
    reset();
  };
  const handleClose = (e: any, reason: any) => {
    reset();
    props?.onClose?.(e, reason);
  };
  const reset = () => {
    setQuantity(1);
    setSelectedSize("");
    setPromo("");
  };

  return (
    <Dialog {...rest} fullWidth maxWidth={"sm"} onClose={handleClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <h4>Select size :</h4>
        <RadioGroup row name="radio-buttons-group" value={selectedSize}>
          {Object.keys(Sizes).map((size) => (
            <FormControlLabel
              key={size}
              value={size}
              control={<Radio />}
              label={`${size} ($${getPrice(price, size)})`}
              onChange={handleSizeChange}
            />
          ))}
        </RadioGroup>
        <h4>Select Quantity :</h4>
        <div>
          <Chip
            label="-"
            clickable={quantity > 1}
            onClick={() => {
              if (quantity > 1) setQuantity((q) => q - 1);
            }}
          />{" "}
          {quantity}{" "}
          <Chip
            label="+"
            clickable={true}
            onClick={() => setQuantity((q) => q + 1)}
          />
        </div>

        <h4>Apply Promo Code</h4>
        <TextField
          onChange={(e) => setPromo(e.target.value)}
          label="Promo"
          variant="outlined"
          size="small"
          disabled={promoDisable}
        />
        {isPromoValid && (
          <Alert>
            Promo code applied. One extra burger will be added in cart
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={!selectedSize}
          onClick={addtoCart}
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
