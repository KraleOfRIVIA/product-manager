import { Button } from "@/shared/ui/Button";
import { DeleteProductButtonProps } from "../model/types";
import { useAppDispatch } from "@/shared/lib/store/hooks";
import { deleteProduct } from "@/entities/product/model/slice";

export const DeleteButton = ({
  productId,
  onDeleted,
}: DeleteProductButtonProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (confirm("Удалить товар?")) {
      await dispatch(deleteProduct(productId));
      onDeleted?.();
    }
  };

  return (
    <Button variant="secondary" onClick={handleDelete}>
      Удалить
    </Button>
  );
};
