import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../shared/model/hero.model';
import {ActivatedRoute, Params} from '@angular/router';
import {HeroService} from '../shared/service/hero.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit() {
    // :id 값은 생성자로 받는 route에 들어있다.
    // +this.route.params['id']에서 맨 앞의 +는 number로 형변환 하는 연산자이다.
    // this.route.params
    //  .switchMap((params: Params) => this.heroService.getHero(+params['id']))
    //  .subscribe(hero => this.hero = hero);
    //
    // this.route.params function은 observalbe로 래핑된 params 객체를 리턴해준다.
    // observable 객체를 받기 위해서 함수형 기법을 사용해서 subscribe() 함수로 받아야 한다.
    // subscribe() 함수는 function(callback function)을 파라미터로 받는다.
    // 이러한 프로그래밍 기법을 Reactive-programming 이라고 한다.
    // route를 통해서 params(데이터)가 도착하는 즉시 callback function이 호출된다.
    // Real-time processing!
    //
    // this.route.params.subscribe(function(p: Params){
    //   this.id = p['id'];
    //   console.log(this.id);
    // });
    //
    // '=>' 연산자를 이용한 최종 모습
    this.route.params.subscribe((p: Params) => this.hero = this.heroService.getHero(+p['id']));
  }

  goBack(): void {
    this.location.back();
  }
}
