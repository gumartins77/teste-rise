import { PrismaClient } from '@prisma/client';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateBatchDto } from '../dto/create-batch.dto';

export class BatchRepository extends PrismaClient {
  async createBatch(data: CreateBatchDto) {
    const newBatch = await this.batch
      .create({
        data: {
          ...data,
        },
      })
      .catch(handleError);

    return newBatch;
  }
}
