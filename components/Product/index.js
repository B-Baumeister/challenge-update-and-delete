import Comments from "../Comments";
import { ProductCard } from "./Product.styled";
import ProductForm from "../ProductForm";
import { StyledButton } from "../Button/Button.styled";
import { StyledLink } from "../Link/Link.styled";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);

  async function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
    }

    // if (isLoading) {
    //   return <h1>Loading...</h1>;
    // }

    // if (!data) {
    //   return;
    // }

    return (
      <>
        {/* <ProductForm (isEditMode && ... ? handleEditProduct=onSubmit : null) /> */}

        <ProductCard>
          <h2>{data.name}</h2>
          <p>Description: {data.description}</p>
          <p>
            Price: {data.price} {data.currency}
          </p>
          {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
          <StyledButton
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "stop editing" : "Edit fish"}
          </StyledButton>
          {isEditMode && (
            <ProductForm
              onSubmit={handleEditProduct}
              isEditing={isEditMode}
              fishData={data}
            />
          )}
          <StyledLink href="/">Back to all</StyledLink>
        </ProductCard>
      </>
    );
  }
}
