import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "../../actions/group.action";

const NewGroup = ({ visible }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const dispatch = useDispatch();

  const handleForm = (event) => {
    event.preventDefault();

    dispatch(
      addGroup({
        name,
        pass: password,
        grade,
      })
    );
    visible(false);
    alert("Groupe ajouté avec succès");
  };

  return (
    <div className="group">
      <form action="" className="new-form" onSubmit={handleForm}>
        <h2>Nouveau groupe</h2>
        <Spacer y={0.5} />
        <Input
          required={true}
          labelLeft="Nom du groupe"
          underlined
          color="primary"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Input
          required={true}
          labelLeft="Mot de passe"
          underlined
          color="primary"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div className="select">
          <div className="span-bar">
            <span>Grade</span>
          </div>
          <select
            required={true}
            color="primary"
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <Spacer y={1} />

        <div className="button-form">
          <Button color="success" type="submit" auto ghost>
            Ajouter un groupe
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

export default NewGroup;
