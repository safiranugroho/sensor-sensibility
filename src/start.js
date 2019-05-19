import PubNub from 'pubnub';
import processStreamBySensorGroup from './processStreamBySensorGroup';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
});

export default () => {
  pubnub.addListener({
    message: (data) => {
      processStreamBySensorGroup(data.message);
    }
  });

  pubnub.subscribe({
    channels: ['pubnub-sensor-network']
  });
};