import React, { useMemo } from 'react';

const RainAnimation = ({ intensity = 'medium' }) => {
  const rainDrops = useMemo(() => {
    const drops = [];
    const count = intensity === 'light' ? 30 : intensity === 'heavy' ? 80 : 50;
    
    for (let i = 0; i < count; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 0.5 + 0.5,
        animationDelay: Math.random() * 2,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }
    return drops;
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop absolute"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.animationDuration}s`,
            animationDelay: `${drop.animationDelay}s`,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
};

const SnowAnimation = ({ intensity = 'medium' }) => {
  const snowFlakes = useMemo(() => {
    const flakes = [];
    const count = intensity === 'light' ? 20 : intensity === 'heavy' ? 60 : 40;
    const symbols = ['❄', '❅', '❆'];
    
    for (let i = 0; i < count; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        animationDuration: Math.random() * 2 + 3,
        animationDelay: Math.random() * 5,
        fontSize: Math.random() * 0.5 + 0.5,
      });
    }
    return flakes;
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowFlakes.map((flake) => (
        <div
          key={flake.id}
          className="snow-flake absolute"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            fontSize: `${flake.fontSize}rem`,
          }}
        >
          {flake.symbol}
        </div>
      ))}
    </div>
  );
};

const CloudAnimation = () => {
  const clouds = useMemo(() => {
    const cloudArray = [];
    for (let i = 0; i < 3; i++) {
      cloudArray.push({
        id: i,
        top: Math.random() * 50 + 10,
        width: Math.random() * 100 + 100,
        height: Math.random() * 40 + 40,
        animationDuration: Math.random() * 20 + 30,
        animationDelay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    return cloudArray;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud-shape absolute"
          style={{
            top: `${cloud.top}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            animationDuration: `${cloud.animationDuration}s`,
            animationDelay: `${cloud.animationDelay}s`,
            opacity: cloud.opacity,
          }}
        />
      ))}
    </div>
  );
};

const SunAnimation = () => {
  const sunRays = useMemo(() => {
    const rays = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) * (Math.PI / 180);
      rays.push({
        id: i,
        angle: i * 30,
        width: Math.random() * 2 + 1,
        height: Math.random() * 20 + 40,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }
    return rays;
  }, []);

  return (
    <div className="fixed top-20 right-20 pointer-events-none z-0">
      <div className="sun-rays animate-spin-slow">
        {sunRays.map((ray) => (
          <div
            key={ray.id}
            className="sun-ray absolute"
            style={{
              width: `${ray.width}px`,
              height: `${ray.height}px`,
              transform: `rotate(${ray.angle}deg)`,
              opacity: ray.opacity,
            }}
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-300 rounded-full animate-pulse-slow opacity-20" />
    </div>
  );
};

const MistAnimation = () => {
  const mistLayers = useMemo(() => {
    const layers = [];
    for (let i = 0; i < 5; i++) {
      layers.push({
        id: i,
        bottom: i * 15,
        opacity: (5 - i) * 0.1,
        animationDelay: i * 0.5,
      });
    }
    return layers;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {mistLayers.map((layer) => (
        <div
          key={layer.id}
          className="absolute w-full h-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-pulse-slow"
          style={{
            bottom: `${layer.bottom}%`,
            opacity: layer.opacity,
            animationDelay: `${layer.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

const ThunderstormAnimation = () => {
  const [lightning, setLightning] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLightning(true);
      setTimeout(() => setLightning(false), 150);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <RainAnimation intensity="heavy" />
      {lightning && (
        <div className="fixed inset-0 bg-white opacity-20 pointer-events-none z-10 animate-pulse" />
      )}
    </>
  );
};

const WeatherAnimations = ({ weatherCondition, isNightTime }) => {
  const getAnimationComponent = () => {
    if (!weatherCondition) return null;

    const condition = weatherCondition.toLowerCase();

    if (condition.includes('rain') && condition.includes('thunder')) {
      return <ThunderstormAnimation />;
    }
    
    if (condition.includes('thunderstorm') || condition.includes('storm')) {
      return <ThunderstormAnimation />;
    }
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <RainAnimation intensity={condition.includes('heavy') ? 'heavy' : 'medium'} />;
    }
    
    if (condition.includes('snow') || condition.includes('sleet')) {
      return <SnowAnimation intensity={condition.includes('heavy') ? 'heavy' : 'medium'} />;
    }
    
    if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
      return <MistAnimation />;
    }
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      return !isNightTime ? <SunAnimation /> : null;
    }
    
    if (condition.includes('cloud')) {
      return <CloudAnimation />;
    }

    return null;
  };

  return (
    <div className="weather-animations">
      {getAnimationComponent()}
    </div>
  );
};

export default WeatherAnimations;
export { RainAnimation, SnowAnimation, CloudAnimation, SunAnimation, MistAnimation, ThunderstormAnimation };
