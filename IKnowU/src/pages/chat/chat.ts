import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var AgoraRTC, $;
@Component({
    selector: 'chat-page',
    templateUrl: 'chat.html'
})

export class ChatPage {
    @ViewChild('chat') chatElement: ElementRef;
    chat: any;
    client: any;
    localStream: any;
    camera: any;
    microphone: any;
    key: string = '70d34118171849ce81089d51e4ab5923';
    channel: string = '1000';
    audioSourceSelected: string;
    videoSourceSelected: string;
    audioSourceList: any[] = [];
    videoSourceList: any[] = [];
    videoChecked: boolean = true;
    leaveDisabled: boolean = false;
    publishDisabled: boolean = false;
    unpublishDisabled: boolean = false;
    constructor(
        private navCtrl: NavController,
        private platform: Platform
    ) {
    }

    ionViewWillEnter() {
        


        


    }

    join() {
    var channel_key = null;
    console.log("Init AgoraRTC client with vendor key: " + this.key);
    this.client = AgoraRTC.createClient({ mode: 'interop' });
    let $this = this;
    this.client.init(this.key, function () {
        console.log("AgoraRTC client initialized");
        $this.client.join(channel_key, $this.channel, null, function (uid) {
            console.log("User " + uid + " join channel successfully");

            if ($this.videoChecked) {
                $this.camera = $this.videoSourceSelected;
                $this.microphone = $this.audioSourceSelected;
                $this.localStream = AgoraRTC.createStream({ streamID: uid, audio: true, cameraId: $this.camera, microphoneId: $this.microphone, video: $this.videoChecked, screen: false });
                //localStream = AgoraRTC.createStream({streamID: uid, audio: false, cameraId: camera, microphoneId: microphone, video: false, screen: true, extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg'});
                if ($this.videoChecked) {
                    $this.localStream.setVideoProfile('720p_3');
                }
                $this.localStream.init(function () {
                    console.log("getUserMedia successfully");
                    $this.localStream.play('agora_local');

                    $this.client.publish($this.localStream, function (err) {
                        console.log("Publish local stream error: " + err);
                    });

                    $this.client.on('stream-published', function (evt) {
                        console.log("Publish local stream successfully");
                    });
                }, function (err) {
                    console.log("getUserMedia failed", err);
                });
            }
        }, function (err) {
            console.log("Join channel failed", err);
        });
    }, function (err) {
        console.log("AgoraRTC client init failed", err);
    });

    let channelKey = "";
    this.client.on('error', function (err) {
        console.log("Got error msg:", err.reason);
        if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
            $this.client.renewChannelKey(channelKey, function () {
                console.log("Renew channel key successfully");
            }, function (err) {
                console.log("Renew channel key failed: ", err);
            });
        }
    });


    this.client.on('stream-added', function (evt) {
        var stream = evt.stream;
        console.log("New stream added: " + stream.getId());
        console.log("Subscribe ", stream);
        $this.client.subscribe(stream, function (err) {
            console.log("Subscribe stream failed", err);
        });
    });

    this.client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        console.log("Subscribe remote stream successfully: " + stream.getId());
        if ($('div#video #agora_remote' + stream.getId()).length === 0) {
            $('div#video').append('<div id="agora_remote' + stream.getId() + '" style="float:left; width:810px;height:607px;display:inline-block;"></div>');
        }
        stream.play('agora_remote' + stream.getId());
    });

    this.client.on('stream-removed', function (evt) {
        var stream = evt.stream;
        stream.stop();
        $('#agora_remote' + stream.getId()).remove();
        console.log("Remote stream is removed " + stream.getId());
    });

    this.client.on('peer-leave', function (evt) {
        var stream = evt.stream;
        if (stream) {
            stream.stop();
            $('#agora_remote' + stream.getId()).remove();
            console.log(evt.uid + " leaved from this channel");
        }
    });
}

    leave() {
        this.leaveDisabled = true;
    this.client.leave(function () {
        console.log("Leavel channel successfully");
    }, function (err) {
        console.log("Leave channel failed");
    });
}

    publish() {
        this.publishDisabled = true;
        this.unpublishDisabled = false;
    this.client.publish(this.localStream, function (err) {
        console.log("Publish local stream error: " + err);
    });
}

    unpublish() {
        this.publishDisabled = false;
        this.unpublishDisabled = true;
    this.client.unpublish(this.localStream, function (err) {
        console.log("Unpublish local stream failed" + err);
    });
}

    getDevices() {
        this.videoSourceList = [];
        this.audioSourceList = [];
        let $this = this;
    AgoraRTC.getDevices(function (devices) {
        for (var i = 0; i !== devices.length; ++i) {
            var device = devices[i];
            if (device.kind === 'audioinput') {
                device.deviceName = device.label || 'microphone ' + ($this.videoSourceList.length + 1);

                $this.videoSourceList
                    .push(device);
            } else if (device.kind === 'videoinput') {
                device.deviceName = device.label || 'camera ' + ($this.videoSourceList.length + 1);
                $this.videoSourceList.push(device);
            } else {
                console.log('Some other kind of source/device: ', device);
            }
        }
    });
}


}
