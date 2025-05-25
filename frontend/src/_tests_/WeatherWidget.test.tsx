import { render, screen } from '@testing-library/react';
import WeatherWidget from '../components/WeatherWidget';

describe('WeatherWidget', () => {
  it('displays weather information', async () => {

    jest.spyOn(require('axios'), 'get').mockResolvedValue({
      data: {
        name: 'Johannesburg',
        main: { temp: 20, humidity: 50 },
        weather: [{ description: 'Sunny', icon: '01d' }]
      }
    });

    render(<WeatherWidget />);
    
    
    expect(await screen.findByText('Weather in Johannesburg')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });
});