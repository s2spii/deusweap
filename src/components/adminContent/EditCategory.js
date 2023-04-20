import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCategory, editCategory } from "../../actions/category.action";

const EditCategory = ({ id, name, visible }) => {
  const [editName, setEditName] = useState(name);
  const dispatch = useDispatch();

  const handleForm = (event) => {
    event.preventDefault();

    dispatch(editCategory({ name: editName }, id));

    visible({
      id: "",
      name: "",
      state: false,
    });
    alert("Catégorie modifié avec succès");
  };

  const handleDelete = () => {
    dispatch(deleteCategory(name, id));
    visible({
      id: "",
      name: "",
      state: false,
    });
    alert("Catégorie supprimé avec succès");
  };

  return (
    <div className="group">
      <form action="" className="new-form" onSubmit={handleForm}>
        <h2>{name}</h2>
        <Spacer y={0.5} />
        <Input
          required={true}
          labelLeft="Nom de la catégorie"
          underlined
          color="primary"
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
        />

        <Spacer y={1} />

        <div className="button-form">
          <Button color="success" type="submit" auto ghost>
            Modifier
          </Button>
          <Button
            color="error"
            onClick={() => {
              handleDelete();
            }}
            auto
            ghost
          >
            Supprimer
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              visible({
                id: "",
                name: "",
                state: false,
              });
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

export default EditCategory;
