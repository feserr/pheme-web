
const Home = (props: {userName: string}) => {


  return (
    <div>
      {props.userName ? "Hi " + props.userName : "Login to access"}
    </div>
  );
};

export default Home;