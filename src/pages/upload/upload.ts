import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Moduls } from '../../models/firestore/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { UploadProvider } from '../../providers/upload/upload';
import { Uploads } from '../../models/upload/upload'

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})

export class UploadPage {

	email: string;
	course: string[];
	moduls: Moduls[];

	selectedNIM: number;
	selectedCode: string;
	selectedIndex: number;
	selectedTitle: string;
	selectedFile: File;

	loading: Loading;

	selectedFiles: FileList;
	currentUpload: Uploads;

	constructor(
		public fp: FirestoreProvider,
		public fire: AngularFireAuth,
		public upSvc: UploadProvider,
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
					this.updateSelectedNIM(result[0].nim);

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

	updateSelectedNIM(nim) {
		this.selectedNIM = +nim;
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
		console.log(this.moduls)

	}

	onChangeCourse(courseCode) {

		this.selectedCode = courseCode.toString();
		this.fp.getModuls(courseCode.toString()).subscribe(result => {

			this.updateModuls(result);

		});

	}

	onChangeModul(modul) {

		this.selectedIndex = +modul
		for (let index = 0; index < this.moduls.length; ++index) {

		    if (this.moduls[index].index == this.selectedIndex) {
		    	this.selectedTitle = this.moduls[index].title

		    }
		}

	}

	updateselectedTitle(title) {

		this.selectedTitle = title;

	}

	onChangeFile(file) {

		this.selectedFiles = file.target.files;

	}
	
	uploadLaporan() {

		let file = this.selectedFiles.item(0)
		this.currentUpload.file = file;
		this.upSvc.pushUpload(this.currentUpload, this.selectedCode, this.selectedIndex, this.selectedNIM, this.selectedTitle)
		
	}

	ionViewDidLoad() {

		this.getCourseCode(this.email);
		console.log('ionViewDidLoad UploadPage');

	}

}