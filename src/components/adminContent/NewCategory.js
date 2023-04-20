import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../actions/category.action";

const NewCategory = ({ visible }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleFormProduct = (event) => {
    event.preventDefault();

    dispatch(
      addCategory({
        name,
      })
    );
    visible(false);
    alert("Catégorie ajoutée avec succès");
  };

  return (
    <div className="category">
      <form action="" className="new-form" onSubmit={handleFormProduct}>
        <h2>Nouvelle catégorie</h2>
        <Spacer y={0.5} />
        <Input
          required={true}
          labelLeft="Nom de la catégorie"
          underlined
          color="primary"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Spacer y={1} />

        <div className="button-form">
          <Button color="success" type="submit" auto ghost>
            Ajouter une catégorie
          </Button>
          <Button
            color="error"
            onClick={() => {
              visible(false);
            }}
            auto
            ghost
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
