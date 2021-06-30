import React from 'react';
import {gql, useQuery} from '@apollo/client';
import MainHeader from './../../components/MainHeader'
import Error from './../../components/Error'
import Loader from './../../components/Loader'
// style
import './style.scss';


const GET_COMPANY_INFO = gql`
{
  company {
    name
    summary
  }
}

`;



const Home = () => {

    const {data,loading,error} = useQuery(GET_COMPANY_INFO);

    if(loading){return <Loader />};
    if(error){return <Error error={error} />};
    console.log(data)
    return <div className="home__container d-flex align-items-center text-center">
        <MainHeader name={data.company.name} description={data.company.summary} />
    </div>;
};

export default Home;
