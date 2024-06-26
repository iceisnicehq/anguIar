import { Component, DestroyRef } from '@angular/core';
import { DialogComponent } from './entities/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IGym } from 'src/app/entities/intefaces/app.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Заголовок для страницы
   *
   * @public
   * @type {string}
   */
  public title: string = 'Лабораторная работа №2';
  /**
   * Массив объектов типа интерфейса IGym
   *
   * @public
   * @type {IGym[]}
   */
  public tableData: IGym[] = [];
  /**
   * объект типа IGym для изменения
   *
   * @public
   * @type {string}
   */
  public currItem?: IGym;
  /**
   * Объявление конструктора
   *
   * @param {MatDialog} _dialog - сервис диалога
   * @param {destroyRef} _destroyRef - отписка
   */
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _destroyRef: DestroyRef
  ) {}
    /**
   * Открытие диалогового окна после клика и сохранение данных
   *
   * @method
   * @description открытие диалогового окна после клика,
   * сохранение данных в таблицу после submit'a
   * и отписка от ивента
   * @public
   * @return {void}
   */
  public onClick(): void {
    const dialogRef = this._dialog.open(DialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data: IGym) => {
        if (data) {
          this.tableData.push(data);
        }
    });
  }
   /**
   * Удаление ряда из таблицы
   *
   * @method
   * @param { IGym } delItem - объект интерфейса delItem
   * @description создается константа индекс, которая принимает значение
   * индекса удаляемого объекта(ряда) с помощью строгого сравнения,
   * затем убираем эту строку через метод splice
   * @public
   * @type { IGym} - для item
   * @return {void}
   */
  public onDelete(delItem: IGym): void {
    const index: number = this.tableData.findIndex((item) => item === delItem);
    this.tableData.splice(index, 1);
  }
   /**
   * Измененеие ряда из таблицы
   *
   * @method
   * @param { IGym } currItem - объект интерфейса delItem
   * @description создается константа индекс, которая принимает значение
   * индекса изменяемого объекта(ряда) с помощью строгого сравнения,
   * затем перезаписываем эту строку
   * @public
   * @type { IGym} - для currItem
   * @return {void}
   */
  public onChange(currItem: IGym): void {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: currItem,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data: IGym) => {
        if (data) {
          const index: number = this.tableData.findIndex((item) => item === currItem);
          this.tableData[index] = data;
        }
    });
  }
}
