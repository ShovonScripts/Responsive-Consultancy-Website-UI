import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { AnalogClock } from './AnalogClock';

interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  forecast: Array<{ day: string; temp: number; condition: string }>;
}

export function WeatherWidget() {
  const [time, setTime] = useState(new Date());
  const [weather] = useState<WeatherData>({
    temp: 28,
    feelsLike: 31,
    condition: 'sunny',
    forecast: [
      { day: 'Tomorrow', temp: 29, condition: 'sunny' },
      { day: 'Tuesday', temp: 27, condition: 'cloudy' },
      { day: 'Wednesday', temp: 26, condition: 'rainy' },
    ],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-[var(--gold)]" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-[var(--accent2)]" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-[var(--accent2)]" />;
      default:
        return <Sun className="w-8 h-8 text-[var(--gold)]" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      timeZone: 'Asia/Dhaka',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="p-6 bg-card border-border space-y-4 backdrop-blur-sm">
      {/* Clock Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Dhaka, Bangladesh</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Analog Clock */}
          <AnalogClock size={120} />

          {/* Digital Time */}
          <div>
            <div className="text-3xl tabular-nums tracking-tight">
              {formatTime(time)}
            </div>
            <div className="text-sm text-muted-foreground">
              {getGreeting()}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {formatDate(time)}
        </div>
      </div>

      {/* Weather Section */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-2xl">
                {weather.temp}°C
              </div>
              <div className="text-xs text-muted-foreground">
                Feels like {weather.feelsLike}°C
              </div>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="grid grid-cols-3 gap-2">
          {weather.forecast.map((day, idx) => (
            <div
              key={idx}
              className="text-center p-2 rounded-lg bg-muted/30 space-y-1"
            >
              <div className="text-xs text-muted-foreground">{day.day}</div>
              <div className="flex justify-center">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-sm">{day.temp}°C</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}