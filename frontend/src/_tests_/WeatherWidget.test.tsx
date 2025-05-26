// import { render, screen, waitFor } from '@testing-library/react';
// import WeatherWidget from '../components/WeatherWidget';


// jest.mock('axios', () => ({
//   __esModule: true,
//   default: {
//     get: jest.fn(() => Promise.resolve({
//       data: {
//         name: 'Johannesburg',
//         main: { temp: 20, humidity: 50 },
//         weather: [{ description: 'Sunny', icon: '01d' }]
//       }
//     }))
//   }
// }));

// describe('WeatherWidget', () => {
//   it('displays weather information', async () => {
//     render(<WeatherWidget />);
    
//     await waitFor(() => {
//       expect(screen.getByText('Weather in Johannesburg')).toBeInTheDocument();
//     });
// // await waitFor(()=>{});
//     // expect(screen.getByText('20°C')).toBeInTheDocument();
//     //expect(screen.getByText('Sunny')).toBeInTheDocument();
//   });
// });


import { render, screen, waitFor } from '@testing-library/react';
import WeatherWidget from '../components/WeatherWidget';


const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});


jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({
      data: {
        name: 'Johannesburg',
        main: { temp: 20, humidity: 50 },
        weather: [{ description: 'Sunny', icon: '01d' }]
      }
    }))
  }
}));

describe('WeatherWidget', () => {
  afterAll(() => {
    
    mockConsoleError.mockRestore();
  });

  it('displays weather information without errors', async () => {
    render(<WeatherWidget />);
    
   
    await waitFor(() => {
      screen.debug();
      expect(screen.getByText('Weather in Johannesburg')).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('20'))).toBeInTheDocument();

      expect(screen.getByText('Sunny')).toBeInTheDocument();
      expect(screen.getByText('Humidity: 50%')).toBeInTheDocument();
    });

   
    expect(console.error).not.toHaveBeenCalled();
  });

  it('handles API errors gracefully', async () => {
    
    jest.doMock('axios', () => ({
      __esModule: true,
      default: {
        get: jest.fn(() => Promise.reject(new Error('API Error')))
      }
    }));

   
    const { default: ErrorProneWeatherWidget } = await import('../components/WeatherWidget');
    render(<ErrorProneWeatherWidget />);
    
  
    await waitFor(() => {
      expect(screen.getByText('Loading weather...')).toBeInTheDocument();
    });

    expect(console.error).toHaveBeenCalledWith('Error fetching weather:', expect.any(Error));
  });
});