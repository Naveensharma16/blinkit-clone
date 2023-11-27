import { createServer, Model, Server } from "miragejs";
import productone from "../assets/productoneimg.avif";
import producttwo from "../assets/producttwoimg.avif";
import productthree from "../assets/productthreeimg.avif";
import productfour from "../assets/productfourimg.avif";
import productfive from "../assets/productfiveimg.avif";

export default function makeServer(): Server {
  const server = createServer({
    models: {
      product: Model,
    },

    seeds(server) {
      server.db.loadData({
        products: [
          {
            id: 1,
            image: productone,
            name: "Fresh Whole Milk",
            category: "dairy",
            quantity: "1 gallon",
            description:
              "Our fresh whole milk is sourced from local farms, ensuring the highest quality and taste. It's packed with essential nutrients and vitamins, making it the perfect choice for your daily dairy needs. Enjoy the rich, creamy goodness of our whole milk in every sip.",
            price: 3.99,
          },
          {
            id: 2,
            image: producttwo,
            name: "Assorted Fresh Fruits Basket",
            category: "fruits",
            quantity: "5 lb",
            description:
              "Our assorted fresh fruits basket is a delightful mix of seasonal fruits handpicked for their ripeness and flavor. It includes a variety of fruits like apples, oranges, bananas, grapes, and more. This healthy and delicious selection is perfect for snacking or making refreshing fruit salads.",
            price: 9.99,
          },
          {
            id: 3,
            image: productthree,
            name: "Classic Potato Chips",
            category: "snacks",
            quantity: "8 oz",
            description:
              "Indulge in the crunchy goodness of our classic potato chips. Made from premium potatoes and seasoned with a secret blend of spices, these chips are the ultimate snack for movie nights or gatherings with friends.",
            price: 2.49,
          },
          {
            id: 4,
            image: productfour,
            name: "Honey Nut Oat Granola",
            category: "breakfast",
            quantity: "16 oz",
            description:
              "Start your day with a hearty and healthy breakfast featuring our honey nut oat granola. Packed with whole grains, nuts, and a touch of honey, this granola will keep you energized throughout the morning.",
            price: 4.99,
          },
          {
            id: 5,
            image: productfive,
            name: "Chocolate Chip Cookies",
            category: "biscuit",
            quantity: "12-pack",
            description:
              "Indulge your sweet tooth with our irresistible chocolate chip cookies. Baked to perfection, these cookies are loaded with rich chocolate chips, creating a delightful treat for kids and adults alike.",
            price: 3.29,
          },
          {
            id: 6,
            image: productone,
            name: "Premium Cat Food",
            category: "petcare",
            quantity: "5 lb bag",
            description:
              "Treat your furry friend to the best with our premium cat food. Formulated with high-quality ingredients, it provides all the essential nutrients your cat needs to stay healthy and happy.",
            price: 7.99,
          },
          {
            id: 7,
            image: producttwo,
            name: "Gentle Baby Shampoo",
            category: "babycare",
            quantity: "12 oz",
            description:
              "Our gentle baby shampoo is specially formulated to be mild and tear-free. It's perfect for delicate baby skin and hair, ensuring a soothing and comfortable bath time for your little one.",
            price: 4.49,
          },
          {
            id: 8,
            image: productthree,
            name: "Assorted Sweets Box",
            category: "sweet",
            quantity: "1 lb",
            description:
              "Indulge your sweet cravings with our assorted sweets box. This delightful collection features a variety of candies and confections, making it the perfect gift or treat for any occasion.",
            price: 5.99,
          },
          {
            id: 9,
            image: productfour,
            name: "Pain Relief Tablets",
            category: "medicines",
            quantity: "50 tablets",
            description:
              "Relieve pain and discomfort with our trusted pain relief tablets. These easy-to-swallow tablets are effective for headaches, muscle aches, and other common aches and pains.",
            price: 6.99,
          },
          {
            id: 10,
            image: productfive,
            name: "Freshly Baked Baguette",
            category: "bakery",
            quantity: "1 loaf",
            description:
              "Experience the aroma and taste of freshly baked bread with our baguette. Made with the finest ingredients and baked to perfection, it's the perfect accompaniment to your meals.",
            price: 2.99,
          },
        ],
      });
    },

    routes() {
      this.passthrough();

      this.namespace = "api";

      // Endpoint to fetch all products
      this.get("/products", (schema) => {
        return schema.all("product");
      });

      // Endpoint to fetch products by category
      // this.get("/products/:category", (schema, request) => {
      //   const { category } = request.params;
      //   const allproducts = schema.all("product");
      //   // return allproducts.where({ category });
      //   return allproducts.filter((item) => item.category === category);
      // });

      this.get("/products/:id", (schema, request) => {
        const { id } = request.params;
        const allproducts = schema.all("product");
        return allproducts.filter((item) => item.id === id);
      });

      // Endpoint to list categories
      this.get("/categories", (schema) => {
        const categories = schema
          .all("product")
          .models.map((product: any) => product.category);
        return [...new Set(categories)]; // Remove duplicates
      });

      // this.passthrough("https://api.geoapify.com/v1/geocode/**");
      this.passthrough("https://us1.locationiq.com/v1/**");
      this.passthrough("https://api.locationiq.com/v1/**");
    },
  });

  return server;
}
