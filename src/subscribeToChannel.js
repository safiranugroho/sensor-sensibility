import PubNub from 'pubnub';
import getSensorGroup from './getSensorGroup';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
});

export const start = () => {
  pubnub.addListener({
    message: (data) => {
      processLightStream(data.message);
    }
  });

  pubnub.subscribe({
    channels: ['pubnub-sensor-network']
  });
};

const processLightStream = message => {
  const { subject } = getSensorGroup(message);
  subject.next(Number(message.photosensor));
};