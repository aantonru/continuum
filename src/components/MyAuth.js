import React from 'react'
import VK, { Auth } from "react-vk";
 
const MyAuth = () => {
  return (
    <VK apiId={7318801}>
      <Auth
        options={{
          authUrl: 'http:127.0.0.1/ok/',
          onAuth: user => {
            console.log(user.first_name+' '+user.last_name);
          },
        }}
      />
    </VK>
  );
};

export default MyAuth;