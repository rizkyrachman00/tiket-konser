import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteProduct.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { deleteFile } from "@/lib/firebase/service";

type PropTypes = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster } =
    props;
  const [isLoading, setIsloading] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await productServices.deleteProduct(deletedProduct.id);
      if (result.status === 200) {
        setIsloading(false);
        deleteFile(
          `/images/products/${deletedProduct.id}/${
            deletedProduct.image.split("%2F")[3].split("?")[0]
          }`,
          async (status: boolean) => {
            if (status) {
              setToaster({
                variant: "success",
                message: "Success Delete Concert",
              });
              setDeletedProduct({});
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
            }
          }
        );
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Concert",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className={styles.modal__title}>
        Are you sure to delete this concert?
      </h1>
      <Button type="button" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "Yes, Delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
