import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Loading from "../Components/Loading/loading.js";
import Footer from '../Components/Footer/footer.js';
import Logo from '../Utils/receta.png';
import loadingGif from '../Utils/vietnamese.gif'

configure({ adapter: new Adapter() });
describe("<Footer />", () => {
  let footer = shallow(<Footer/>)
  it("Deberia renderizar un form", () => {
    expect(footer.at(0).prop('className')).toEqual("footer");
  });
  it("Deberia renderizar un img", () => {
    expect(footer.find('img').at(0).prop('className')).toEqual("footer-logo");
    expect(footer.find('img').at(0).prop('src')).toEqual(Logo);
    expect(footer.find('img').at(0).prop('alt')).toEqual("Logo");
  });
  it("Deberia renderizar un p", () => {
    expect(footer.find('p').at(0).text()).toEqual('Copyright © 2022 Henry. Genaro Bercini');
  });
});

describe("<Loading />", () => {
  let loading = shallow(<Loading />);
  it("Deberia renderizar un form", () => {
    expect(loading.at(0).prop('className')).toEqual("loading");
  });
  it("Deberia renderizar un img", () => {
    expect(loading.find('img').at(0).prop('className')).toEqual("loading-image");
    expect(loading.find('img').at(0).prop('src')).toEqual(loadingGif);
    expect(loading.find('img').at(0).prop('alt')).toEqual("loading-gif");
  });
});