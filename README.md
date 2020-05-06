# custom-ease-curve

A class for creating fully configurable easing behavior.

## Getting started

There's CustomEaseCurve.js for javascript and CustomEaseCurve.ts for typescript.

... Will add the rest of the instructions later

<br>

## Examples

#### Linear

A curve for a linear interpolation
``` typescript
const curve = new CustomEaseCurve([
  {time: 0, value: 0, velocity: 1}, // 
  {time: 1, value: 1, velocity: 1} // For a linear interpolation, velocity can be any value as long as it's the same for both
]);

curve.getValueAtTime(0.5); // returns 0.5
```

#### Ease in

A curve which starts slowly and increases velocity at the end
``` typescript
const curve = new CustomEaseCurve([
  {time: 0, value: 0, velocity: 0}, // Start slowly
  {time: 1, value: 1, velocity: 1} // End with max velocity
]);

curve.getValueAtTime(0.5); // returns 0.25
```

#### Ease out

A curve which starts at the highest velocity and slows down at the end
``` typescript
const curve = new CustomEaseCurve([
  {time: 0, value: 0, velocity: 1}, // Start at max velocity
  {time: 1, value: 1, velocity: 0} // End slowly
]);

curve.getValueAtTime(0.5); // returns 0.75
```

#### Ease in and out

A curve which starts and ends slowly with the highest velocity at the half-way point
``` typescript
const curve = new CustomEaseCurve([
  {time: 0, value: 0, velocity: 0}, // Start slowly
  {time: 0.5, value: 0.5, velocity: 1}, // Reach max velocity at the half-way point
  {time: 1, value: 1, velocity: 0} // Slow down in the end
]);

curve.getValueAtTime(0.5); // returns 0.5
```

#### Inverted ease in and out

The opposite of ease in and out, where it instead starts and stops at the highest velocity
``` typescript
const curve = new CustomEaseCurve([
  {time: 0, value: 0, velocity: 1}, // Start at max velocity
  {time: 0.5, value: 0.5, velocity: 0}, // Slow down at the half-way point
  {time: 1, value: 1, velocity: 1} // End at max velocity
]);

curve.getValueAtTime(0.5); // returns 0.5
```

#### Repeating ease in and out

A curve with two ease in and out, where it both starts and ends at value 0
``` typescript
const curve = new CustomEaseCurve([
  {time: 0, value: 0, velocity: 0},
  {time: 0.25, value: 0.5, velocity: 1},
  {time: 0.5, value: 1, velocity: 0},
  {time: 0.75, value: 0.5, velocity: 1},
  {time: 1, value: 0, velocity: 0},
]);

curve.getValueAtTime(0.5); // returns 1
```

#### Bounce

A curve suitable for a bouncing ball, where it bounces up 3 times, each with less height
``` typescript
curve = new CustomEaseCurve([
  {time: 0, value: 0, velocity: 1}, // Bounce up
  {time: 2, value: 1, velocity: 0}, // Reach the peak value of 1
  {time: 4, value: 0, velocity: 1}, // Fall down
  
  // We change direction by adding a time that is the same as the last
  {time: 4, value: 0, velocity: 1}, // Bounce up
  {time: 5, value: 0.4, velocity: 0}, // Reach the peak value of 0.4
  {time: 6, value: 0, velocity: 1}, // Fall down
  
  // Same here
  {time: 6, value: 0, velocity: 1}, // Bounce up
  {time: 6.5, value: 0.15, velocity: 0}, // Reach the peak value of 0.15
  {time: 7, value: 0, velocity: 1}, // Fall down
]);

curve.getValueAtTime(0.5); // returns 0.25
```

<br>

## Tips

When using getValueAtTime, you can actually pass a time value that isn't within the range you defined. So if you pass -1 it will calculate where the value would be at that point in time, based on the direction it will move in at the start.

Same goes for a time that's greater than the last defined time. Using the bounce curve as an example, If you pass a time of 10, the value will be less than 0, giving the effect that the ball falls down from the surface it just bounced on.
