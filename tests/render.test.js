// import React from 'react';
// import renderer from 'react-test-renderer';

// // import App from '../App';
// import HomeScreen from '../screens/HomeScreen';
// import MatchesScreen from '../screens/MatchesScreen';

// import { Provider } from 'react-redux';
// import { store } from '../redux/store';

// describe('<HomeScreen />', () => {
// //   it('has 1 child', () => {
// //     const tree = renderer.create(<HomeScreen />).toJSON();
// //     expect(tree.children.length).toBe(1);
// //   });
//     it("renders correctly", () => {
//         const tree = renderer.create(<Provider store={store}><HomeScreen/></Provider>).toJSON();
//         expect(tree).toMatchSnapshot();
//     });
// });

// describe('<MatchesScreen />', () => {
//     it("renders correctly", () => {
//         const tree = renderer.create(<MatchesScreen />).toJSON();
//         expect(tree).toMatchSnapshot();
//     });
// });

// describe('<HomeScreen />', () => {
//     //   it('has 1 child', () => {
//     //     const tree = renderer.create(<HomeScreen />).toJSON();
//     //     expect(tree.children.length).toBe(1);
//     //   });
//         it("renders correctly", () => {
//             const tree = renderer.create(<HomeScreen />).toJSON();
//             expect(tree).toMatchSnapshot();
//         });
//     });

// // import SpotifyLoginScreen from '../screens/SpotifyLoginScreen';
// import SurveyGeneralQuestionsScreen from '../screens/SurveyGeneralQuestionsScreen';
// import SurveyBioScreen from '../screens/SurveyBioScreen';
// import SurveyAdvancedQuestionsScreen from '../screens/SurveyAdvancedQuestionsScreen';
// // import AddImagesScreen from '../screens/AddImagesScreen';
// import MatchesScreen from '../screens/MatchesScreen';
// // import ProfileScreen from '../screens/ProfileScreen';
// import SocialsScreen from '../screens/SocialsScreen';

// // describe('<SurveyGeneralQuestionsScreen />', () => {
// //     it("renders correctly", async () => {
// //         const tree = await renderer.create(<SurveyGeneralQuestionsScreen />).toJSON();
// //         expect(tree).toMatchSnapshot();
// //     });
// // });

// // describe('<SurveyBioScreen />', () => {
// //     it("renders correctly", () => {
// //         const tree = renderer.create(<SurveyBioScreen />).toJSON();
// //         expect(tree).toMatchSnapshot();
// //     });
// // });

// // describe('<SpotifyLoginScreen />', () => {
// //     it("renders correctly", () => {
// //         const tree = renderer.create(<SpotifyLoginScreen />).toJSON();
// //         expect(tree).toMatchSnapshot();
// //     });
// // });

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // Import Screens

// const Stack = createStackNavigator();

// describe('App', () => {
//   it('renders all screens', async () => {
//     const tree = await renderer.create(
//       <NavigationContainer>
//         <Stack.Navigator>
//           {/* <Stack.Screen name="SpotifyLogin" component={SpotifyLoginScreen} /> */}
//           <Stack.Screen name="SurveyGeneralQuestionsScreen" component={SurveyGeneralQuestionsScreen} />
//           <Stack.Screen name="SurveyBioScreen" component={SurveyBioScreen} />
//           <Stack.Screen name="SurveyAdvancedQuestionsScreen" component={SurveyAdvancedQuestionsScreen} />
//           {/* <Stack.Screen name="AddImagesScreen" component={AddImagesScreen} /> */}
//           <Stack.Screen name="HomeScreen" component={HomeScreen} />
//           <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
//           {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
//           <Stack.Screen name="SocialsScreen" component={SocialsScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

////////////////////////////////////////////////////////////////////////////////
// jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
//     'expo-media-library': {},
//   }));
  
// import React, { Component } from "react";
// import { Text } from "react-native";
// import { render } from "@testing-library/react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import SpotifyLoginScreen from "../screens/SpotifyLoginScreen";
// import SurveyGeneralQuestionsScreen from "../screens/SurveyGeneralQuestionsScreen";
// import SurveyBioScreen from "../screens/SurveyBioScreen";
// import SurveyAdvancedQuestionsScreen from "../screens/SurveyAdvancedQuestionsScreen";
// import AddImagesScreen from "../screens/AddImagesScreen";
// import HomeScreen from "../screens/HomeScreen";
// import MatchesScreen from "../screens/MatchesScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import SocialsScreen from "../screens/SocialsScreen";

// const Stack = createStackNavigator();

// class ErrorBoundary extends Component {
//   state = {
//     hasError: false,
//   };

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     console.error(error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Fallback UI when an error occurs
//       return <Text>Something went wrong.</Text>;
//     }

//     return this.props.children;
//   }
// }

// describe("App", () => {
//   it("renders all screens", () => {
//     render(
//       <ErrorBoundary>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen name="SpotifyLoginScreen" component={SpotifyLoginScreen}/>
//             <Stack.Screen name="SurveyGeneralQuestionsScreen" component={SurveyGeneralQuestionsScreen}/>
//             <Stack.Screen name="SurveyBioScreen" component={SurveyBioScreen} />
//             <Stack.Screen name="SurveyAdvancedQuestionsScreen" component={SurveyAdvancedQuestionsScreen}/>
//             <Stack.Screen name="AddImagesScreen" component={AddImagesScreen}/>
//             <Stack.Screen name="HomeScreen" component={HomeScreen} />
//             <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
//             <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//             <Stack.Screen name="SocialsScreen" component={SocialsScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </ErrorBoundary>
//     );

//     expect(true).toBe(true); // Placeholder assertion to ensure the test runs
//   });
// });

///////////////////////////////////////////////////////////////

// import renderer from "react-test-renderer";
// import { render } from "@testing-library/react-native";

// describe("<HomeScreen />", () => {
//     it("has 1 child", () => {
//         const tree = renderer.create(<HomeScreen />).toJSON();
//         expect(tree.children.length).toBe(1);
//     });

//     it("renders correctly", () => {
//         const tree = renderer.create(<HomeScreen />).toJSON();
//         expect(tree).toMatchSnapshot();
//     });
//     it("renders Hello World message on the home page", async () => {
//         render(<HomeScreen />);
//         expect(screen.getByText("Hello, World!")).toBeDefined()
//     });
// });

// import React from 'react';
// import renderer from 'react-test-renderer';

// // import App from '../App';
// // import HomeScreen from '../screens/HomeScreen';
// import SocialsScreen from '../screens/SocialsScreen';

// describe('<SocialsScreen />', () => {
// //   it('has 1 child', () => {
// //     const tree = renderer.create(<SocialsScreen />).toJSON();
// //     expect(tree.children.length).toBe(5);
// //   });
//     jest.mock('@react-navigation/native', () =>({
//         NavigationEvents: 'mockNavigationEvents',
//     }))

//   it('renders correctly', () => {
//     const tree = renderer.create(<SocialsScreen />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });

// });

////////////////////////////////////////

// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import SpotifyLoginScreen from '../screens/SpotifyLoginScreen';

// describe('SpotifyLoginScreen', () => {
//   it('renders correctly', () => {
//     const { getByTestId } = render(<SpotifyLoginScreen />);
//     // const loginButton = getByTestId('Button');
//     const loginButton = getByTestId('LoginButton');
//     expect(loginButton).toBeDefined();
//   });

//   it('triggers Spotify login when button is pressed', () => {
//     const handleLogin = jest.fn();
//     const { getByTestId } = render(<SpotifyLoginScreen onLogin={handleLogin} />);
//     // const loginButton = getByTestId('Button');
//     const loginButton = getByTestId('LoginButton');
//     fireEvent.press(loginButton);

//     expect(handleLogin).toHaveBeenCalled();
//   });
// });

// import React from 'react';
// import { render, fireEvent, expect } from '@testing-library/react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SpotifyLoginScreen from '../screens/SpotifyLoginScreen';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

// import { Provider } from 'react-redux';
// import { store } from '../redux/store';

// // const middlewares = [thunk];
// // const mockStore = configureMockStore(middlewares);
// // const store = mockStore({});

// describe('SpotifyLoginScreen', () => {
//   const Stack = createStackNavigator();
//   const navigation = {
//     navigate: jest.fn(),
//   };

//   it('triggers Spotify login when button is pressed', () => {
//     const handleLogin = jest.fn();
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen
//               name="SpotifyLoginScreen"
//               component={SpotifyLoginScreen}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//     );
//     const loginButton = getByTestId('LoginButton');
//     fireEvent.press(loginButton);

//     // Wait for the authentication process to finish
//     new Promise(resolve => setTimeout(resolve, 1000));

//     expect(handleLogin).toHaveBeenCalled();
//   });
// });


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { Button } from '@rneui/base';
import configureStore from 'redux-mock-store';
import SpotifyLoginScreen from "../screens/SpotifyLoginScreen";

const mockStore = configureStore([]);

describe('Spotify Login Screen', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      id: {
        id: null,
        spotifydata: null,
        topartists: null,
        toptracks: null,
        topgenres: null,
        userToken: null,
        email: null,
      },
    });

    component = (
      <Provider store={store}>
        <SpotifyLoginScreen />
      </Provider>
    );
  });

  it('should render the authentication button', () => {
    const { getByTestId } = render(component);
    const authButton = getByTestId('auth-button');

    expect(authButton).toBeDefined();
    expect(authButton.props.title).toBe('Log in with Spotify');
  });

  it('should dispatch the setUserToken action on button press', () => {
    const { getByTestId } = render(component);
    const authButton = getByTestId('auth-button');
    fireEvent.press(authButton);

    const actions = store.getActions();
    expect(actions[0].type).toBe('SET_USER_TOKEN');
  });
});