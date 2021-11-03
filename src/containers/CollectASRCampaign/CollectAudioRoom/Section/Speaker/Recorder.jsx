import React, { Component } from 'react';
import RecorderJS from 'recorder-js';

import Button from '@material-ui/core/Button';
import { Mic, Stop } from '@material-ui/icons';
import { getAudioStream, exportBuffer } from './audio';

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = { stream: null, recorder: null, originalSampleRate: 44100 };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  async componentDidMount() {
    let stream;
    try {
      stream = await getAudioStream();
    } catch (error) {
      console.log(error);
    }

    this.setState({ stream });
  }

  startRecord() {
    const { stream } = this.state;
    const { roomID } = this.props;
    const { socket } = this.props;
    const { username } = this.props;
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setIsRecording(true);
    this.setState(
      { recorder, originalSampleRate: audioContext.sampleRate },
      () => recorder.start(),
    );
    if (socket) {
      socket.emit('Recording', { roomID, username });
    }
  }

  async stopRecord() {
    const { originalSampleRate } = this.state;
    const { recorder } = this.state;
    const { roomID } = this.props;
    const { socket } = this.props;
    const { username } = this.props;
    const { buffer } = await recorder.stop();
    const audio = exportBuffer(buffer[0], originalSampleRate);
    const url = window.URL.createObjectURL(audio);
    // Process the audio here.
    this.props.setIsRecording(false);
    this.props.setBlob(audio);
    this.props.setAudio(url);
    // eslint-disable-next-line react/no-unused-state
    this.setState({ disableRecording: true });
    if (socket) {
      socket.emit('Done Recording', {
        roomID,
        username,
      });
    }
  }

  render() {
    const { stream } = this.state;
    if (!stream) return null;

    return (
      <div className="button-listen">
        <div className="primary-button">
          <Button
            className="record"
            type="button"
            disabled={this.props.disabled}
            onClick={() => {
              this.props.isRecording ? this.stopRecord() : this.startRecord();
            }}
          >
            {this.props.isRecording ? <Stop /> : <Mic />}
          </Button>
          <div className="primary-button background" />
        </div>
      </div>
    );
  }
}

export default Recorder;
