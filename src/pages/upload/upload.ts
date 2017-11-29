import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Moduls, Uploads } from '../../models/firestore/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { UploadProvider } from '../../providers/upload/upload';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})

export class UploadPage {

	email: string;
	course: string[];
	moduls: Moduls[];

	selectedCode: string;
	selectedIndex: number;
	selectedFile: File;

	loading: Loading;

	constructor(
		public fp: FirestoreProvider,
		public fire: AngularFireAuth,
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController) {

		this.email = fire.auth.currentUser.email;
	}
	
	getCourseCode(email) {

		this.presentLoading();
		try {

			this.fp.getAccounts(email).subscribe(result => {

				if (result.length>0) {
					
					this.updateCourseList(result[0].course);

				} else {

					console.log('Got nothing');
				}
				this.dismissLoadng();

			});

		} catch(err) {

			console.log('got err: ', err);
			this.dismissLoadng();
			
		}
		this.dismissLoadng();

	}

	updateCourseList(course) {

		this.course = course;

	}

	presentLoading() {

		this.loading = this.loadingCtrl.create({

		  spinner: 'ios',
		  content: "Please wait...",
		  dismissOnPageChange: true,
		  duration: 5000

		});
		this.loading.present();

	}

	dismissLoadng() {

		if (this.loading) {

			this.loading.dismiss();
			this.loading = null;

		}

	}

	updateModuls(modul) {

		this.moduls = modul

	}

	onChangeCourse(courseCode) {

		this.selectedCode = courseCode.toString();
		this.fp.getModuls(courseCode.toString()).subscribe(result => {

			this.updateModuls(result);

		});

	}

	onChangeModul(modul) {

		this.selectedIndex = +modul;

	}

	uploadLaporan() {

		console.log('Upload Laporan Weh!');
		
	}

	ionViewDidLoad() {

		this.getCourseCode(this.email);
		console.log('ionViewDidLoad UploadPage');

	}

}