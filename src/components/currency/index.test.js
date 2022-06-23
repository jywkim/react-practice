import { rest } from "msw";
import { setupServer } from "msw/node";
import { convert } from "./convert";

const server = setupServer(
  rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ rates: { CAD: 1.42 } }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("converts correctly", async () => {
  const rate = await convert("USD", "CAD");
  expect(rate).toEqual(1.42);
});