import axios from "axios";
import React, { useState } from "react";

const NewGroup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");

  const handleForm = (event) => {
    event.preventDefault();

    axios.post("http://localhost:5000/categories/add", {
      name,
      password,
      grade,
    });
  };

  return (
    <form action="" className="new-form" onSubmit={handleForm}>
      <label htmlFor="name" name="name">
        Nom du groupe:
      </label>
      <input
        required={true}
        type="text"
        id="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label htmlFor="password" name="password">
        Mot de passe:
      </label>
      <input
        required={true}
        type="text"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label htmlFor="grade">Grade:</label>
      <select
        required={true}
        id="grade"
        onChange={(e) => {
          setGrade(e.target.value);
        }}
      >
        <option value=""></option>
        <option value="user">Utilisateur</option>
        <option value="admin">Administrateur</option>
      </select>
      <input type="submit" className="button" value="Nouveau Produit" />
    </form>
  );
};

export default NewGroup;
