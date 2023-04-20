import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import { deleteGroup, editGroups } from "../../actions/group.action";
import { useDispatch } from "react-redux";

const EditGroup = ({ id, name, pass, grade, visible }) => {
  const [editName, setEditName] = useState(name);
  const [editPassword, setEditPassword] = useState(pass);
  const [editGrade, setEditGrade] = useState(grade);
  const dispatch = useDispatch();

  const handleForm = (event) => {
    event.preventDefault();

    dispatch(
      editGroups(
        { name: editName, password: editPassword, grade: editGrade },
        id
      )
    );

    visible({
      id: "",
      name: "",
      password: "",
      grade: "",
      state: false,
    });
    alert("Groupe modifié avec succès");
  };

  const handleDelete = () => {
    dispatch(deleteGroup(id));
    visible({
      id: "",
      name: "",
      password: "",
      grade: "",
      state: false,
    });
    alert("Groupe supprimé avec succès");
  };

  return (
    <div className="group">
      <form action="" className="new-form" onSubmit={handleForm}>
        <h2>{name}</h2>
        <Spacer y={0.5} />
        <Input
          required={true}
          labelLeft="Nom du groupe"
          underlined
          color="primary"
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
        />

        <Input
          required={true}
          labelLeft="Mot de passe"
          underlined
          color="primary"
          value={editPassword}
          onChange={(e) => {
            setEditPassword(e.target.value);
          }}
        />

        <div className="select">
          <div className="span-bar">
            <span>Grade</span>
          </div>
          <select
            required={true}
            color="primary"
            value={editGrade}
            onChange={(e) => {
              setEditGrade(e.target.value);
            }}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <Spacer y={1} />

        <div className="button-form">
          <Button color="success" type="submit" auto ghost>
            Modifier le groupe
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
                password: "",
                grade: "",
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

export default EditGroup;
