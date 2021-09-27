export class Alarm {
  id = 0;
  hour = ''; /**HH:mm*/
  label = '';
  days: boolean[] = Array(7).fill(false);
  sound = 0;
  vibrate = false;
  repeat = false;
  active = false;
}
