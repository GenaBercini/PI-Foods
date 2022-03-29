import Home from "../Components/Home/home.js";
import Card from "../Components/Cards/Card.js";
import isReact from "is-react";

describe("Home Component", () => {
  before(() => expect(isReact.functionComponent(CreateHouse)).toBeTruthy());

  it('Debería renderizar en un tag "img" la imagen provista en la carpeta "img-cp2"', () => {
    expect(Home.find("img").at(0).prop("src"))
  });

  it('La imagen debería tener un atributo "alt" con el texto "main-img"', () => {
    expect(Home.find("img").at(0).prop("alt")).toEqual("logo");
  });
  
  it("Debería mapear la cantidad de houses que hayan en el store y renderizar una <HouseCard /> por cada una", () => {
      expect(Home.find(Card));
  })
});
