import { Helmet } from "react-helmet";



const HelmetProvider = ({title}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Bistro Boss | {title}</title>
    </Helmet>
  );
};

export default HelmetProvider;
