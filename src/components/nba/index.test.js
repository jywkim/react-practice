import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { act } from "react-dom/test-utils";
import App from "./index";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

const url= process.env.REACT_APP_PLAYERS_URL;
   
describe("App test", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Load Players", async () => {
    await act(async () => {
      await axios.get.mockImplementationOnce(() => Promise.resolve(url));
      wrapper = mount(<App />);
    });

    wrapper.update();
    await expect(axios.get).toHaveBeenCalledTimes(1);
  });
});