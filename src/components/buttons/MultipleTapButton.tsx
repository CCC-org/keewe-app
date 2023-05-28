import React, { useState, useEffect } from 'react';
import { Pressable, PressableProps } from 'react-native';

interface MultiTapButtonProps extends PressableProps {
  requiredTaps?: number;
  timeLimit?: number;
  onMultiTap: () => void;
}

const MultiTapButton: React.FC<MultiTapButtonProps> = ({
  requiredTaps = 7, // defaults to 7
  timeLimit = 2000, // defaults to 2 seconds
  onMultiTap,
  ...props
}) => {
  const [taps, setTaps] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (taps >= requiredTaps) {
      onMultiTap();
      resetTapCount();
    } else if (taps > 0) {
      setTimer(
        setTimeout(() => {
          resetTapCount();
        }, timeLimit),
      );
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [taps]);

  const handlePress = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTaps(taps + 1);
  };

  const resetTapCount = () => {
    setTaps(0);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(null);
  };

  return <Pressable {...props} onPress={handlePress} />;
};

export default MultiTapButton;
