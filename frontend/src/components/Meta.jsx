import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Let's Be Your Solmate",
  description: "Let us be your Solmate",
  keywords: "bracelets, necklaces, rings, earings",
};

export default Meta;
