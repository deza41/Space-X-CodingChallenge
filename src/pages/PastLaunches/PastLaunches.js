import React, {Fragment} from 'react';
import {fromPromise, gql, useQuery} from '@apollo/client';
import Error from './../../components/Error'
import Loader from './../../components/Loader'
import LaunchesFeed from './../../components/LaunchesFeed';
// style

const GET_LAUNCHES_QUERY = gql`
query launchesPast {
  launchesPast(limit: 15) {
    mission_name
    launch_site {
      site_name_long
    }
    links {
      article_link
      flickr_images
    }
    id
  }
}
`;




const PastLaunches = () => {
    //apollo query
    const {data,loading,error} = useQuery(GET_LAUNCHES_QUERY);

    //lets you doing a polling interval
    // const {data,loading,error} = useQuery(GET_LAUNCHES_QUERY,{
    //   pollInterval:5000,
    // });

    console.log(data)

    if(loading){return <Loader />};
    if(error){return <Error error={error} />};

    
 
    //filter results that have link and image
    const launches = data.launchesPast.filter(
    launch => launch.links.article_link && 
    launch.links.flickr_images.length > 0
    );

    return (
        //you can also use <> </> instead of fragments
        <Fragment>
            <h1 className="display-4 text-center my-5 pt-5">Past Launches</h1>
            <LaunchesFeed launches={launches} />
        </Fragment>
    );
};

export default PastLaunches;
